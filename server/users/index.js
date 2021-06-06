require('dotenv').config();

var router = require('express').Router();
var passport = require('passport');
var Image = require('../models/UserImageCollectionSchema');
var Token = require('../models/TokenSchema');
var User = require('../models/UserModel');
var crypto = require('crypto');
var cloudinary = require('cloudinary').v2;
var { check, body, validationResult } = require('express-validator');

var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

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

    function outputTokenInEmail(emailType) {
      if (emailType !== 'change of password') return `/${token.token}`;
      else return '';
    }

    var sendMail = function(senderEmail, receiverEmail, emailSubject, emailBody) {
      var data = {
        from: senderEmail,
        to: receiverEmail,
        subject: emailSubject,
        text: emailBody
      };

      mailgun.messages().send(data, (error, body) => {
        if (error) console.log(error);
        else console.log(body);
      });
    };

    var senderEmail = process.env.EMAIL_ADDRESS;
    var receiverEmail = `${user.username}`;
    var emailSubject = subjectField;
    var emailBody = `${textField}${outputTokenInEmail(emailType)}`;

    // User-defined function to send email
    sendMail(senderEmail, receiverEmail, emailSubject, emailBody);
  });
}

// Since we are using the passport.authenticate() method, we should be redirected no matter what
router.post(
  '/login',
  [body('username').isEmail(), check('password').isLength({ min: 7, max: 11 })],
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).send({
        msg: [
          'Please follow the validations above',
          're-enter a proper email and/or password.'
        ]
      });
    }

    User.findOne({ username: req.body.username }).then(user => {
      if (!user) {
        return res.status(404).send({
          msg: [
            `We were unable to find this user.`,
            `This email and/or password combo may be incorrect.
              Please confirm with the "Forgot password" link above or the "Register" link below!`
          ]
        });
      } else {
        next();
      }
    });
  },

  passport.authenticate('local', { session: true }),

  function(req, res) {
    var user = req.user;

    console.log('In /login ', user);

    if (user.isVerified === false) {
      return res.status(403).send({
        msg: [
          'Your username has not been verified!',
          'Check your email for a confirmation link.'
        ]
      });
    }
    return res.status(200).send({
      userId: user._id,
      msg: [`Your have successfully logged in;`, `Welcome to Hillfinder!`]
    });
  }
);

router.get('/user_avatar', (req, res, next) => {
  try {
    cloudinary.api.resources_by_tag(`userId=${req.user._id}`, function(error, result) {
      console.log('result ', result);
      if (error) {
        return res.send({ error: error });
      }

      return res.send({
        avatar_info: result.resources[0]
      });
    });
  } catch (error) {
    res.status(500).json({ error: `User hasn't logged in yet` });
  }
});

router.get('/user_data', (req, res) => {
  if (req.user === undefined) {
    return res.json({ username: 'User not logged in' });
  } else {
    return res.json({
      userId: req.user._id
    });
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  console.log('You have logged out!');
  return res.status(201).send({
    msg: ['Your have successfully logged out!']
  });
});

router.post('/registration', async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(409).send({
      msg: [
        'The email address you have entered is already associated with another account.',
        'Please re-enter another email address.'
      ]
    });
  } else {
    // Insert the new user if they do not exist yet
    user = new User({
      username: req.body.username,
      password: req.body.password
    });
    await user.save();
    nodeMailerFunc(
      user,
      `Account Verification`,
      `Hello, Welcome to Hillfinders! An app on the decline—er about declines!\nPlease verify your account by clicking the following link:\nhttp://${
        req.headers.host
      }/confirmed`,
      'verification email',
      res
    );
    return res.status(201).send({
      msg: [
        'Your user registration was successful.',
        'Please check your email to complete your registration!'
      ]
    });
  }
});

router.get('/confirmation/:token', (req, res) => {
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

router.post('/forgot_password', (req, res) => {
  // Checks for errors in validation
  try {
    User.findOne(
      {
        username: req.body.username
      },
      function(err, user) {
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
      }
    );
  } catch (err) {
    return next(err);
  }
});

router.post('/reset_password/:token', (req, res, next) => {
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

module.exports = router;
