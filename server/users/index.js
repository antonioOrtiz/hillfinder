var router = require('express').Router();
var passport = require('passport');
var User = require('../models/UserModel');
var Token = require('../models/TokenSchema');

var crypto = require('crypto');
require('dotenv').config();
var nodemailer = require('nodemailer');

var { body, sanitizeBody, validationResult } = require('express-validator');

router
  .route('/login')
  .get((req, res) => {
    User.find({}, (err, users) => {
      if (err) res.status(404).send({ error: req.query.error });
      res.json(users);
      return;
    });
  })
  .post(passport.authenticate('local'), (req, res) => {
    return User.findOne({ username: req.body.username }, (err, user) => {
      console.log('user ', user);
      if (user.isVerified === false) {
        res.status(401).send({ msg: req.error });
        return;
      } else {
        res.status(200).send({ msg: 'All good!' });
      }
    });
  });

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
    (req, res, next) => {
      // Checks for errors in validation

      console.log('req ', req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(409).json({ errors: errors.array() });
      }
      try {
        User.findOne({ username: req.body.username }, function(err, user) {
          // Make sure user doesn't already exist
          if (user)
            return res.status(400).send({
              msg:
                'The email address you have entered is already associated with another account.'
            });

          // Create and save the user
          user = new User({
            username: req.body.username,
            password: req.body.password
          });
          user.save(err => {
            if (err) {
              return res.status(500).send({ msg: err.message });
            }

            // Create a verification token for this user
            var token = new Token({
              _userId: user._id,
              token: crypto.randomBytes(16).toString('hex')
            });

            // Save the verification token
            token.save(function(err) {
              if (err) {
                return res.status(500).send({ msg: err.message });
              }
              // Send the email
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: `${process.env.EMAIL_ADDRESS}`,
                  pass: `${process.env.EMAIL_PASSWORD}`
                }
              });
              var mailOptions = {
                from: '17antonio.ortiz@gmail.com',
                to: `${req.body.username}`,
                subject: 'Account Verification Token',
                text: `Hello,
                     Please verify your account by clicking the link:
                    http://${req.headers.host}/users/confirmation/${token.token}`
              };
              transporter.sendMail(mailOptions, function(err) {
                if (err) {
                  return res.status(500).send({ msg: err.message });
                }
                res
                  .status(200)
                  .send(`A verification email has been sent to ${user.username}.`);
              });
            });
          });
        });
      } catch (err) {
        return next(err);
      }
    }
  );

router.route('/confirmation/:token').get((req, res, next) => {
  Token.findOne({ token: req.params.token }, function(err, token) {
    if (!token)
      return res.status(400).send({
        type: 'not-verified',
        msg: 'We were unable to find a valid token. Your token my have expired.'
      });

    // If we found a token, find a matching user
    User.findOne({ _id: token._userId, email: req.body.username }, function(err, user) {
      if (!user)
        return res
          .status(400)
          .send({ msg: 'We were unable to find a user for this token.' });
      if (user.isVerified)
        return res.status(400).send({
          type: 'already-verified',
          msg: 'This user has already been verified.'
        });

      // Verify and save the user
      user.isVerified = true;
      user.save(function(err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        res.status(200).send('The account has been verified. Please log in.');
      });
    });
  });
});

router.route('/resend_token').get(
  [
    body('username')
      .isEmail()
      .normalizeEmail()
      .not()
      .isEmpty()
  ],
  (req, res, next) => {
    User.findOne({ username: req.body.username }, function(err, user) {
      if (!user) {
        return res.status(400).send({
          msg: 'We were unable to find a user with that email.'
        });
      }

      if (!user.isVerified) {
        return res.status(400).send({
          msg: 'This account has already been verified. Please log in.'
        });
      }

      // Create a verification token, save it, and send email
      var token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString('hex')
      });

      // Save the token
      token.save(function(err) {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }

        // Send the email
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`
          }
        });

        var mailOptions = {
          from: '17antonio.ortiz@gmail.com',
          to: `${user.username}`,
          subject: 'Account Verification Token',
          text: `Hello, Please verify your account by clicking the link:
          http://${req.headers.host}/users/registration/confirmation/${token.token}`
        };

        transporter.sendMail(mailOptions, function(err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res
            .status(200)
            .send(`A verification email has been sent to   ${user.username}`);
        });
      });
    });
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
          service: 'gmail',
          auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`
          }
        });
        var mailOptions = {
          from: '17antonio.ortiz@gmail.com',
          to: `${user.username}`,
          subject: `Link to reset password`,
          text: `You are receiving this because you (or someone else ) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it...`
        };
        transporter.sendMail(mailOptions, (err, res) => {
          if (err) {
            console.error(`There was an error:: ${err}`);
          } else {
            console.log(`Here is the res: ${res}`);
            res.status(200).json(`Recovery email sent`);
          }
        });
      }
    })
    .catch(err => next(err));
});

module.exports = router;
