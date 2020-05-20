var router = require('express').Router();
var passport = require('passport');
var multer = require('multer');
var Image = require('../models/userImageCollectionSchema');
var Token = require('../models/tokenSchema');
var User = require('../models/userModel');
var crypto = require('crypto');

var nodemailer = require('nodemailer');
var nodemailerMailgun = require('nodemailer-mailgun-transport');
require('dotenv').config();
var USER = require('../index');
function nodeMailerFunc(user, subjectField, textField, emailType, res) {
  var token = new Token({
    _userId: user._id,
    token: crypto.randomBytes(16).toString('hex')
  });

  // Save the token
  token.save(function(err) {
    if (err) {
      return res.status(500).send({ msg: err.message });
    }

    var auth = {
      auth: {
        api_key: process.env.MAILGUN_PRIVATE_API,
        domain: process.env.MAILGUN_DOMAIN
      }
    };

    var transporter = nodemailer.createTransport(nodemailerMailgun(auth));

    function outputTokenInEmail(emailType) {
      if (emailType !== 'change of password') return `/${token.token}`;
      else return '';
    }

    var mailOptions = {
      from: 'info@hillfinders.com',
      to: `${user.username}`,
      subject: subjectField,
      text: `${textField}${outputTokenInEmail(emailType)}`
    };

    transporter.sendMail(mailOptions, function(err) {
      console.log('mailOptions ', mailOptions);
      if (err == true) {
        return res.status(500).send({
          msg: err.message
        });
      }
      console.log('Message sent successfully!');
    });
  });
}

router.route('/login').post((req, res, next) => {
  passport.authenticate('local', (err, user) => {
    console.log(
      'user ',
      user // console.log('res.locals.user ', res.locals.user);
    );

    USER = { ...USER, ...user._doc };
    console.log('USER ', USER);

    if (!user) {
      return res.status(404).send({
        msg: [
          `We were unable to find this user.`,
          `This email and/or password combo may be incorrect.
          Please confirm with the "Forgot password" link above or the "Register" link below!`
        ]
      });
    }

    if (user.isVerified === false) {
      return res.status(401).send({
        msg: [
          'Your username has not been verified!',
          'Check your email for a confirmation link.'
        ]
      });
    } else {
      return res.status(200).send({
        msg: [`Your have successfully logged in;`, `Welcome to Hillfinders!`]
      });
    }
  })(req, res, next);
});

router.route('/registration').post((req, res, next) => {
  User.findOne({ username: req.body.username }, function(err, user) {
    if (user) {
      return res.status(409).send({
        msg: [
          'The email address you have entered is already associated with another account.',
          'Please re-enter another email address.'
        ]
      });
    }

    user = new User({
      username: req.body.username,
      password: req.body.password
    });

    user.save(function(err) {
      if (err) {
        return res.status(401).send({
          msg: [
            'You entered an incorrect username and/or email.',
            'Please follow the validations above, re-enter a proper email and password.'
          ]
        });
      }

      nodeMailerFunc(
        user,
        `Account Verification`,
        `Hello, Welcome to Hillfinders! An app on the decline—er about declines!\nPlease verify your account by clicking the following link:\nhttp://${
          req.headers.host
        }/confirmed`,
        'verification email',
        res
      );
      console.log('user ', user);
      return res.status(201).send({
        msg: [
          'Your user registration was successful.',
          'Please check your email to complete your registration!'
        ]
      });
    });
  });
});

router.route('/confirmation/:token').get((req, res, next) => {
  var { token } = req.params;

  try {
    Token.findOne({ token: token }, function(err, token) {
      if (token === null) {
        console.log('We were unable to find a valid token 404 ', 404);
        return res.status(404).send({
          msg: ['We were unable to find a valid token. Your token my have expired.']
        });
      }
      // If we found a token, find a matching user

      if (token) {
        User.findOne({ _id: token._userId }, function(err, user) {
          if (!user) {
            return res.status(404).send({
              msg: ['We were unable to find a user for this token.']
            });
          } else if (user.isVerified) {
            return res.status(400).send({
              msg: ['This user has already been verified.']
            });
          } else if (!user.isVerified) {
            // Verify and save the user
            user.isVerified = true;
            user.update({ isVerified: true }, function(err) {
              if (err) {
                return res.status(500).send({ msg: [err.message] });
              }
            });
            return res.status(200).send({
              msg: ['The account has been verified. Please log in!']
            });
          }
        });
      }
    });
  } catch (err) {
    return next(err);
  }
});

router.route('/forgot_password').post((req, res) => {
  // Checks for errors in validation
  try {
    User.findOne({ username: req.body.username }, function(err, user) {
      if (!user) {
        return res.status(404).send({
          msg: [
            'We were unable to find this user.',
            'Please re-enter another email address, or click the link below to register.'
          ]
        });
      } else if (user) {
        user.generatePasswordReset();
        user.save(() => {
          nodeMailerFunc(
            user,
            `Your password has been reset`,
            `Click the following link to reset your password:\nhttp://${
              req.headers.host
            }/update_password`,
            'email to update your password',
            res
          );
        });
        return res.status(200).send({
          msg: [
            'Your password has been reset!',
            'Please check your email for the link which will allow you to reset your password!'
          ]
        });
      }
    });
  } catch (err) {
    return next(err);
  }
});

router.route('/reset_password/:token').post((req, res, next) => {
  var { token } = req.params;

  try {
    Token.findOne({ token: token }, function(err, token) {
      if (token === null) {
        return res.status(401).send({
          msg: ['We were unable to find a valid token. Your token my have expired.']
        });
      }
      if (token) {
        User.findOne({ _id: token._userId }, function(err, user) {
          console.log('user ', user);
          if (!user) {
            return res.status(404).send({
              msg: ['We were unable to find a user for this token.']
            });
          } else if (user) {
            user.password = req.body.password;
            user.isVerified = true;
            user.save(err => {
              if (err) {
                return res.status(500).json({ message: err.message });
              }
              nodeMailerFunc(
                user,
                `Your password has been changed!`,
                `You may now login with your new password—${req.body.password}!`,
                'change of password',
                res
              );
              return res.status(201).send({
                msg: ['Your password has been changed!']
              });
            });
          }
        });
      }
    });
  } catch (err) {
    return next(err);
  }
});

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

var fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // rejects storing a file
    cb(null, false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

/*
stores image in uploads folder
using mulkter and creates a reference to the file
*/

router.route('/uploadmulter').post(upload.any('imageData'), (req, res, next) => {
  var newImage = new Image({
    avatar: {
      _userId: USER._id,
      imageName: req.body.imageName,
      imageData: req.body.imageData
    }
  });

  newImage
    .save()
    .then(result => {
      res.status(200).json({
        success: true,
        document: result
      });
    })
    .catch(err => next(err));
});

module.exports = router;
