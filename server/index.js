const express = require('express');

require('dotenv').config()

const nextJS = require('next');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var bodyParser = require('body-parser')
var auth = require('./lib/auth');
var cors = require('cors')
var morgan = require('morgan')
var HttpStatus = require('http-status-codes')
var PORT = process.env.PORT || 8016

const { isBlockedPage, isInternalUrl } = require('next-server/dist/server/utils');

function NODE_ENVSetter(ENV) {
    var environment,
        environments = {
            'production': () => {
                environment = process.env.PRODUCTION_DB_DSN;
                return environment;
            },
            'test': () => {
                environment = process.env.TEST_DB_DSN;
                return environment;
            },
            'default': () => {
                environment = process.env.DEVELOPMENT_DB_DSN;
                console.log("environment ", environment);
                return environment;
            },
        };
    (environments[ENV] || environments['default'])();

    return environment
}

var db = NODE_ENVSetter('development')
var mongoose = require('mongoose')

function errorHandler(err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // Log error
    console.error(err.stack)

    // Render the error page
    res.status(err.status || 500)

    // Default error message by HTTP code
    res.render('error', {
        title: HttpStatus.getStatusText(err.status),
        message: HttpStatus.getStatusText(err.status)
    })
}

async function start() {
    const dev = process.env.NODE_ENV !== 'production';
    const app = nextJS({ dev });
    const server = express();
    await app.prepare()
        .then(() => {
            mongoose.connect(db, { useNewUrlParser: true })
            mongoose.Promise = global.Promise

            mongoose.connection
                .on('connected', () => {
                    console.log(`Mongoose connection open on ${db}`)
                })
                .on('error', err => {
                    console.log(`Connection error: ${err.message}`)
                });
        })
        .catch(err => {
            console.error(err)
        })

    server.use('/uploads', express.static(__dirname + '/uploads'))
    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(morgan('dev'))

    server.use(cookieParser())

    server.use(session({
        secret: 'very secret 12345',
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    }));

    server.use(auth.initialize);
    server.use(auth.session);
    server.use(auth.setUser);

    server.use(cors())
    server.use('/users', require('./users'))
    server.use('/images', require('./images'))

    // Redirect all requests to main entrypoint pages/index.js
    server.get('/*', async(req, res, next) => {
        try {
            // @NOTE code duplication from here
            // https://github.com/zeit/next.js/blob/cc6fe5fdf92c9c618a739128fbd5192a6d397afa/packages/next-server/server/next-server.ts#L405
            const pathName = req.originalUrl;
            if (isInternalUrl(req.url)) {
                return app.handleRequest(req, res, req.originalUrl)
            }

            if (isBlockedPage(pathName)) {
                return app.render404(req, res, req.originalUrl)
            }

            // Provide react-router static router with a context object
            // https://reacttraining.com/react-router/web/guides/server-rendering
            req.locals = {};
            req.locals.context = {};
            const html = await app.renderToHTML(req, res, '/', {});

            // Handle client redirects
            const context = req.locals.context;
            if (context.url) {
                return res.redirect(context.url)
            }

            // Handle client response statuses
            if (context.status) {
                return res.status(context.status).send();
            }

            // Request was ended by the user
            if (html === null) {
                return;
            }

            app.sendHTML(req, res, html);
        } catch (e) {
            next(e);
        }
    });

    server.use(function(req, res, next) {
        res.status(404).send('404 - Not Found!');
    });

    // eslint-disable-next-line func-names
    server.use(errorHandler, function(error, req, res, next) {
        res.json({ message: error.message })
    })

    server.listen(PORT, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`)
    });
}

start();
