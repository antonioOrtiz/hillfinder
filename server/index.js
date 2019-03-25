var express = require('express')
var next = require('next')
// var { parse } = require('url')
var bodyParser = require('body-parser')
var cors = require('cors')

var PORT = process.env.PORT || 8016
var dev = process.env.NODE_ENV !== 'production'

var NextApp = next({ dev })
var handle = NextApp.getRequestHandler()
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost:27017')

NextApp.prepare().then(() => {
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cors())

  // app.use('/', require('./routes'))

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
  })
}).catch(err => {
  console.error(err)
})
