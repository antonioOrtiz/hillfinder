require('dotenv').config();
var createError = require('http-errors');
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

var db = NODE_ENVSetter('development');

function start() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = nextJS({ dev });
  const server = express();
  // const proxy = createProxyMiddleware(options);

  app
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
  // server.use(express.static(path.join(__dirname + 'uploads')));
  server.use('/uploads', express.static('uploads'));

  server.use(cors());
  server.use(cookieParser());
  server.use(bodyParser.json());
  server.use(
    session({
      secret: 'very secret 12345',
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
  );
  server.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));

  server.use(auth.initialize);
  server.use(auth.session);

  server.use(compression());
  server.use(helmet());

  server.use('/users', require('./users'));

  // server.use((req, res, next) => {
  //   console.log('req.user', req.user._id);
  //   next();
  // });

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

  // eslint-disable-next-line func-names

  class AppError extends Error {
    constructor(message, statusCode) {
      super(message);

      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;

      Error.captureStackTrace(this, this.constructor);
    }
  }

  server.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
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
