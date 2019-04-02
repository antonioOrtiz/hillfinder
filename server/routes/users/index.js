var router = require('express').Router();
var UserModel = require('../../models/UserModel');

router
  .route('/')
  .get(function(req, res) {
    UserModel.find({}, (err, users) => {
      if (err) res.status(500).send(err);
      res.json(users);
    });
  })
  .post((req, res) => {
    var newUser = new UserModel({
      username: req.email,
      password: req.password
    });
  });

// router
//   .route('/:id')
//   .get()
//   .put()
//   .delete();

module.exports = router;
