var router = require('express').Router();
var passport = require('passport');
var User = require('../models/UserModel');
var crypto = require('crypto');
require('dotenv').config();
var nodemailer = require('nodemailer');

var { body, validationResult } = require('express-validator');

router
  .route('/login')
  .get(function(req, res) {
    User.find({}, (err, users) => {
      if (err) res.status(404).send({ error: req.query.error });
      res.json(users);
    });
  })
  .post(
    (req, res, next) => {
      console.log('/login, req.body: ');

      console.log(req.body);
      next();
    },
    passport.authenticate('local'),
    (req, res) => {
      console.log('logged in', req.user);
      var userInfo = {
        username: req.user.username
      };
      res.send(userInfo);
    }
  );

router
  .route('/registration')
  .get(function(req, res) {
    User.find({}, (err, users) => {
      if (err) res.status(500).send(err);
      res.json(users);
    });
  })
  .post(
    body('username').custom(value => {
      return User.findOne({ username: value }).then(user => {
        // Return Promise
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),
    async (req, res, next) => {
      // Checks for errors in validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(409).json({ errors: errors.array() });
      }
      try {
        let newUser = new User(req.body);
        let savedUser = await newUser.save();

        console.log('savedUser ', savedUser);
        if (savedUser) return res.redirect('/users/registration?success=true');
        return next(new Error('Failed to save user for unknown reasons'));
      } catch (err) {
        return next(err);
      }
    }
  );

router.route('/forgot_password').post((req, res, next) => {
  if (req.body.username === '') {
    res.status(400).send('email required');
  }
  console.error(req.body.username);
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user === null) {
        res.status(403).send('Email not in database');
      } else {
        var password = crypto.randomBytes(20).toString('hex');

        user.update({
          resetPassword: password,
          resetPasswordExpires: Date.now() + 3600000
        });

        var transporter = nodemailer.createTransport({
          host: `gmail`,
          port: 587,
          secure: false,
          auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`
          }
        });
        var mailOptions = {
          from: '17antonio.ortiz@gmail.com',
          to: `${user.username}`,
          subject: `Link to reset password`,
          text: `You are receiving this because you (or someone else ) have requested the reset of the password for your account.
        Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it...`
        };
        transporter.sendMail(mailOptions, (err, res) => {
          if (err) {
            console.error(`there was an error:: ${err}`);
          } else {
            console.log(`here is the res: ${res}`);
            res.status(200).json(`recovery email sent`);
          }
        });
      }
    })
    .catch(err => next(err));
});

//www.reddit.com/r/PrequelMemes/comments/f3ri54/my_younger_sister_wrote_me_a_poem_for_valentines/?utm_source=share&utm_medium=web2x

https: module.exports = router;
