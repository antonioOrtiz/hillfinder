require('dotenv').config();
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var mongoose = require('mongoose');
var nextJS = require('next');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var auth = require('./lib/auth');
var HttpStatus = require('http-status-codes');
var compression = require('compression');
var helmet = require('helmet');

var PORT = process.env.PORT || 8016;

var { isBlockedPage, isInternalUrl } = require('next-server/dist/server/utils');

function NODE_ENVSetter(ENV) {
  var environment,
    environments = {
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
        environment = process.env.DEVELOPMENT_DB_DSN;
        console.log(`We are currently in the development environment: ${environment}`);
        return environment;
      }
    };
  (environments[ENV] || environments['default'])();

  return environment;
}

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

var db = NODE_ENVSetter('development');

async function start() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = nextJS({ dev });
  var server = express();
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

  server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', '*'); // enables all the methods to take place
    return next();
  });

  server.use(logger('dev'));
  server.set('view engine', 'html');
  server.use('/uploads', express.static('uploads'));

  server.use(cors());
  server.use(cookieParser());
  server.use(bodyParser.json());

  server.use(
    session({
      secret: 'very secret 12345',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
  );
  server.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

  server.use(auth.initialize);
  server.use(auth.session);
  server.use(auth.setUser);

  server.use(compression());
  server.use(helmet());

  server.use('/users', require('./users'));

  // Redirect all requests to main entrypoint pages/index.js
  server.get('/*', async (req, res, next) => {
    try {
      // @NOTE code duplication from here
      // https://github.com/zeit/next.js/blob/cc6fe5fdf92c9c618a739128fbd5192a6d397afa/packages/next-server/server/next-server.ts#L405
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
  // catch 404 and forward to error handler
  server.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  server.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.errorStatus = err.status;
    res.locals.errorMessage = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log('err.status ', err.status);

    console.log('err.message ', err.message);
    res.status(401).send(err.message);
  });

  if (process.env.NODE_ENV === 'production') {
    server.use(express.static('.next/static'));

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
