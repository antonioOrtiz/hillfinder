/* eslint-disable no-console */
/* eslint-disable no-shadow */
var express = require('express')
var next = require('next')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')
var HttpStatus = require('http-status-codes')

var PORT = process.env.PORT || 8016
var dev = process.env.NODE_ENV !== 'production'
var NextApp = next({ dev })
var handle = NextApp.getRequestHandler()

var mongoose = require('mongoose')

var db = `mongodb://127.0.0.1:27017/hillfinder`

function errorHandler (err, req, res, next) {
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

NextApp.prepare()
  .then(() => {
    const app = express()
    mongoose.connect(db, { useNewUrlParser: true })
    mongoose.Promise = global.Promise

    mongoose.connection
      .on('connected', () => {
        console.log(`Mongoose connection open on ${db}`)
      })
      .on('error', err => {
        console.log(`Connection error: ${err.message}`)
      })

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(morgan('dev'))

    app.use(cookieParser())
    app.use(
      session({
        secret: 'very secret 12345',
        resave: true,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
      })
    )
    app.use(cors())

    // eslint-disable-next-line global-require
    app.use('/auth', require('./auth'))

    app.get('*', (req, res) => {
      return handle(req, res)
    })

    // eslint-disable-next-line func-names
    app.use(errorHandler, function (error, req, res, next) {
      res.json({ message: error.message })
    })

    app.listen(PORT, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error(err)
  })
