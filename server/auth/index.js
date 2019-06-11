
var router = require('express').Router()
var UserModel = require('../models/UserModel')

router
  .route('/users')
  .get(function (req, res) {
    UserModel.find({}, (err, users) => {
      if (err) res.status(500).send(err)
      res.json(users)
    })
  })
  .post((req, res) => {
    var newUser = new UserModel(req.body)
    // var { username, password } = req.body
    // newUser.username = username
    // newUser.password = password
    console.dir(`req.body: ${JSON.stringify(req.body)}`)
    console.dir(`newUser: ${JSON.stringify(newUser)}`)
    newUser.save(err => {
      if (err) return res.json({ success: false, error: err })
      return res.json({ success: true })
    })
  })

// router
//   .route('/:id')
//   .get()
//   .put()
//   .delete();

module.exports = router
