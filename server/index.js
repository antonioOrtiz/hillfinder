var express = require('express')
var next = require('next')
// var { parse } = require('url')
var bodyParser = require('body-parser')
var cors = require('cors')

var PORT = process.env.PORT || 8016
var dev = process.env.NODE_ENV !== 'production'

var app = next({ dev })
var handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(bodyParser.json())
  server.use(cors())

  // server.use('/', require('./routes'))

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
  })
}).catch(err => {
  console.error(err)
})
