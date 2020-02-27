var router = require('express').Router();
var passport = require('passport');
var User = require('../models/UserModel');
var Token = require('../models/TokenSchema');

var crypto = require('crypto');
require('dotenv').config();
var nodemailer = require('nodemailer');

var { body, sanitizeBody, validationResult } = require('express-validator');

function nodeMailerFunc(user, subjectField, textField, emailType) {
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
      subject: subjectField,
      text: textField
    };

    transporter.sendMail(mailOptions, function(err) {
      if (err) {
        return res.status(500).send({ msg: err.message });
      }
      res.status(200).send(`A ${emailType} has been sent to ${user.username}`);
    });
  });
}

router.route('/login').post((req, res, next) => {
  passport.authenticate('local', (err, user) => {
    console.log('user ', user);

    if (user.isVerified === false) {
      res.status(401).send({ msg: req.error });
      return;
    } else {
      res.status(200).send({ msg: 'Your username/email has been verified!' });
    }
  })(req, res, next);
});

router.route('/registration').post((req, res, next) => {
  // Checks for errors in validation
  passport.authenticate('local', (err, user) => {
    try {
      console.log('user ', user);
      if (user)
        return res.status(409).send({
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
        nodeMailerFunc(
          user,
          `Account Verification Token`,
          `Hello, Please verify your account by clicking the link:
          http://${req.headers.host}/users/confirmation/${token.token}`,
          'verification email'
        );
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
});

router.route('/confirmation/:token').get((req, res, next) => {
  try {
    Token.findOne({ token: req.params.token }, function(err, token) {
      if (err)
        return res.status(404).send({
          type: 'not-verified',
          msg: 'We were unable to find a valid token. Your token my have expired.'
        });
      // If we found a token, find a matching user
      User.findOne({ _id: token._userId, email: req.body.username }, function(err, user) {
        if (err)
          return res
            .status(404)
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
          return res
            .status(200)
            .send({ msg: 'The account has been verified. Please log in.' });
        });
      });
    });
  } catch (err) {
    return next(err);
  }
});

router.route('/forgot_password').post((req, res) => {
  // Checks for errors in validation
  console.log('req ', req.body);
  try {
    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) return res.status(404).send({ msg: 'We were unable to find a user.' });

      user.generatePasswordReset();

      user.save(err => {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        nodeMailerFunc(
          user,
          `Your passowrd has been reset`,
          `Click the following link to reset your password:
          http://${req.headers.host}/reset_password/${token}`,
          'email to reset your password'
        );
      });
    });
  } catch (err) {
    return next(err);
  }
});

router.route('/reset_password/:token').get((req, res, next) => {
  try {
    User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    }).then(user => {
      if (!user)
        return res
          .status(401)
          .json({ message: 'Password reset token is invalid or has expired.' });

      //Set the new password
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.isVerified = true;

      // Save
      user.save(err => {
        if (err) return res.status(500).json({ message: err.message });

        nodeMailerFunc(
          user,
          `Your passowrd has been changed`,
          `Click the following link to reset your password:
          http://${req.headers.host}/reset_password/${token}`,
          'email to reset your password'
        );
      });
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
