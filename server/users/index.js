var router = require('express').Router();
var passport = require('passport');
var User = require('../models/UserModel');
var Token = require('../models/TokenSchema');

var crypto = require('crypto');
require('dotenv').config();
var nodemailer = require('nodemailer');

var { body, sanitizeBody, validationResult } = require('express-validator');

function redirectIfLoggedIn(req, res, next) {
  if (req.user) return res.redirect('/profile');
  return next();
}

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

    function outputTokenInEmail(emailType) {
      if (emailType !== 'change of password') return `/${token.token}`;
      else return '';
    }

    var mailOptions = {
      from: '17antonio.ortiz@gmail.com',
      to: `${user.username}`,
      subject: subjectField,
      text: `${textField}${outputTokenInEmail(emailType)}`
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
    if (!user) {
      res.status(404).send({
        msg: [
          'We were unable to find this user.',
          'Please re-enter another email address, or click the link below to register.'
        ]
      });
      return;
    }

    if (user.isVerified === false) {
      res.status(401).send({
        msg: [
          'Your username has not been verified!',
          'Check your email for a confirmation link.'
        ]
      });
      return;
    } else {
      res.status(200).send({
        msg: [`Your have successfully logged in;`, `Welcome to Hillfinder!`]
      });
      return;
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
          msg: [
            'The email address you have entered is already associated with another account.',
            'Please re-enter another email address.'
          ]
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
          `Account Verification`,
          `Hello, Welcome to Hillfinder! An app on the decline—er about declines!\nPlease verify your account by clicking the following link:\nhttp://${
            req.headers.host
          }/confirmed`,
          'verification email'
        );
      });

      return res.status(200).send({
        msg: [
          'Your user registration was successful.',
          'Please check your email to complete your registration!'
        ]
      });
    } catch (err) {
      return next(err);
    }
  })(req, res, next);
});

router.route('/confirmation/:token').get((req, res, next) => {
  var usersToken = req.params.token;

  console.log('usersToken ', usersToken);
  try {
    Token.findOne({ token: usersToken }, function(err, token) {
      if (token === null)
        return res.status(404).send({
          msg: ['We were unable to find a valid token. Your token my have expired.']
        });
      // If we found a token, find a matching user
      User.findOne({ _id: token._userId, email: req.body.username }, function(err, user) {
        if (!user)
          return res
            .status(404)
            .send({ msg: ['We were unable to find a user for this token.'] });
        if (user.isVerified)
          return res.status(400).send({
            msg: ['This user has already been verified.']
          });

        // Verify and save the user
        user.isVerified = true;
        user.save(function(err) {
          if (err) {
            return res.status(500).send({ msg: [err.message] });
          }
        });
        return res
          .status(200)
          .send({ msg: ['The account has been verified. Please log in.'] });
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
      if (!user)
        return res.status(404).send({
          msg: [
            'We were unable to find this user.',
            'Please re-enter another email address, or click the link below to register. Or you may'
          ]
        });

      user.generatePasswordReset();
      user.isVerified = false;
      user.save(err => {
        if (err) {
          return res.status(500).send({ msg: err.message });
        }
        nodeMailerFunc(
          user,
          `Your password has been reset`,
          `Click the following link to reset your password:\nhttp://${
            req.headers.host
          }/update_password`,
          'email to update your password'
        );
      });
      return res.status(200).send({
        msg: [
          'Your password has been reset!',
          'Please check your email for the link which will allow you to reset your password!'
        ]
      });
    });
  } catch (err) {
    return next(err);
  }
});

router.route('/reset_password/:token').post((req, res, next) => {
  console.log('req.params ', req.params);
  console.log('req.body ', req.body);

  try {
    User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() }
    }).then(user => {
      if (!user)
        return res.status(401).send({
          msg: ['Password reset token is invalid or has expired.']
        });

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
          `Your password has been changed!`,
          `You may now login with your new password ${req.body.password} `,
          'change of password'
        );
      });
      return res.status(200).send({
        msg: ['Your password has been changed!']
      });
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
