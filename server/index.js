var express = require('express');

require('dotenv').config();

var nextJS = require('next');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var auth = require('./lib/auth');
var cors = require('cors');
var morgan = require('morgan');
var HttpStatus = require('http-status-codes');
var compression = require('compression');
var helmet = require('helmet');
var path = require('path');

var PORT = process.env.PORT || 8016;

var { isBlockedPage, isInternalUrl } = require('next-server/dist/server/utils');

function NODE_ENVSetter(ENV) {
  var environment,
    environments = {
      development: () => {
        environment = process.env.DEVELOPMENT_DB_DSN;
        console.log(`We are currently in the development environment: ${environment}`);
        return environment;
      },
      production: () => {
        environment = process.env.MONGODB_URI;
        console.log(`We are currently in the production environment: ${environment}`);
        return environment;
      },
      test: () => {
        environment = process.env.TEST_DB_DSN;
        console.log(`We are currently in the test environment: ${environment}`);
        return environment;
      },
      default: () => {
        console.log(`We are currently in no environment, an error is possible `);
      }
    };
  (environments[ENV] || environments['default'])();

  return environment;
}

var db = NODE_ENVSetter('development');
var mongoose = require('mongoose');

function errorHandler(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Log error
  console.error(err.stack);

  // Render the error page
  res.status(err.status || 500);

  // Default error message by HTTP code
  res.render('error', {
    title: HttpStatus.getStatusText(err.status),
    message: HttpStatus.getStatusText(err.status)
  });
}

async function start() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = nextJS({ dev });
  const server = express();
  // const proxy = createProxyMiddleware(options);

  await app
    .prepare()
    .then(() => {
      mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      mongoose.Promise = global.Promise;

      mongoose.connection
        .on('connected', () => {
          console.log(`Mongoose connection open on ${db}`);
        })
        .on('error', err => {
          console.log(`Connection error: ${err.message}`);
        });
    })
    .catch(err => {
      console.error(err);
    });

  server.set('view engine', 'html');

  server.use('/uploads', express.static(__dirname + '/uploads'));
  server.use(express.json());
  server.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  server.use(bodyParser.json());
  server.use(morgan('dev'));

  server.use(cookieParser());

  server.use(
    session({
      secret: 'very secret 12345',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      })
    })
  );

  server.use(compression());
  server.use(helmet());
  server.use(auth.initialize);
  server.use(auth.session);
  server.use(auth.setUser);
  // console.log('auth.setUser ', auth.setUser);

  server.use(cors());
  server.use('/users', require('./users'));

  server.get('/*', async (req, res, next) => {
    try {
      const pathName = req.originalUrl;
      if (isInternalUrl(req.url)) {
        return app.handleRequest(req, res, req.originalUrl);
      }

      if (isBlockedPage(pathName)) {
        return app.render404(req, res, req.originalUrl);
      }

      // Provide react-router static router with a context object
      // https://reacttraining.com/react-router/web/guides/server-rendering
      req.locals = {};
      req.locals.context = {};
      const html = await app.renderToHTML(req, res, '/', {});

      // Handle client redirects
      const context = req.locals.context;
      if (context.url) {
        return res.redirect(context.url);
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

  if (process.env.NODE_ENV === 'production') {
    server.use(express.static('.next/static'));

    // handle GET request to /service-worker.js
    // if (pathname === '/service-worker.js') {
    //   const filePath = join(__dirname, '.next', pathname);

    //   app.serveStatic(req, res, filePath);
    // } else {
    //   handle(req, res, parsedUrl);
    // }

    server.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '.next/static', 'index.html'));
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(
        `> Ready and listening on PORT:${PORT} in the ${process.env.NODE_ENV} environment`
      );
    });
  } else {
    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready and listening on http://localhost:${PORT}`);
    });
  }
}

start();
