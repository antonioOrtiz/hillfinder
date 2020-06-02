var router = require('express').Router();
var passport = require('passport');
var multer = require('multer');
var Image = require('../models/userImageCollectionSchema');
var Token = require('../models/TokenSchema');
var User = require('../models/UserModel');
var crypto = require('crypto');
var path = require('path');
const { check, body, validationResult } = require('express-validator');

var nodemailer = require('nodemailer');
var nodemailerMailgun = require('nodemailer-mailgun-transport');
require('dotenv').config();

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

function bar(req, res, next) {
  console.log('req.user', req.user), next();
}

// function passportLogin(req, res, next) {
//   passport.authenticate('local', { session: true }, function(err, user, info) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(404).send({
//         msg: [
//           `We were unable to find this user.`,
//           `This email and/or password combo may be incorrect.
//               Please confirm with the "Forgot password" link above or the "Register" link below!`
//         ]
//       });
//     }
//     if (user.isVerified === false) {
//       return res.status(403).send({
//         msg: [
//           'Your username has not been verified!',
//           'Check your email for a confirmation link.'
//         ]
//       });
//     }
//     // edit as per comment
//     //return res.send("Test Route Accessed").end();
//     req.user = user; // Forward user information to the next middleware
//     next();
//   })(req, res, next);
// }

// Since we are using the passport.authenticate() method, we should be redirected no matter what
router.post(
  '/login',
  [
    body('username').isEmail(),
    // username must be an email
    // password must be at least 5 chars long
    check('password').isLength({ min: 7, max: 11 })
  ],
  function(req, res, next) {
    console.log('req.user 103 ', req.user);
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
      console.log('req.body ', req.body);
      console.log('user ', user);
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
      msg: [`Your have successfully logged in;`, `Welcome to Hillfinder!`]
    });
  },
  bar
);

// router.route('/login').post(

//     passport.authenticate('local', { session: true }, function(err, user, info) {
//       console.log('in passport');

//       console.log('user ', user);
//       if (!user) {
//         return res.status(404).send({
//           msg: [
//             `We were unable to find this user.`,
//             `This email and/or password combo may be incorrect.
//               Please confirm with the "Forgot password" link above or the "Register" link below!`
//           ]
//         });
//       }

//       if (user.isVerified === false) {
//         return res.status(403).send({
//           msg: [
//             'Your username has not been verified!',
//             'Check your email for a confirmation link.'
//           ]
//         });
//       } else {
//         return res.status(200).send({
//           msg: [`Your have successfully logged in;`, `Welcome to Hillfinder!`]
//         });
//       }
//     })(req, res, next);
//   }
// );

// app.get('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.redirect('/login');
//     }
//     req.logIn(user, function(err) {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });

router.get('/logout', (req, res) => {
  req.logout();
  console.log('You have logged out!');
  return res.status(201).send({
    msg: ['Your have successfully logged out!']
  });
});

router.post('/registration', (req, res) => {
  User.findOne({ username: req.body.username }).then(user => {
    console.log('req.body ', req.body);
    console.log('user ', user);
    if (user) {
      return res.status(409).send({
        msg: [
          'The email address you have entered is already associated with another account.',
          'Please re-enter another email address.'
        ]
      });
    } else if (user === null) {
      const user = new User({
        username: req.body.username,
        password: req.body.password
      });
      user
        .save()
        .then(result => {
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
        })
        .catch(err => {
          return res.status(401).send({
            msg: [
              'You entered an incorrect username and/or email.',
              'Please follow the validations above, re-enter a proper email and password.'
            ]
          });
        });
    }
  });
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
    cb(null, './uploads/avatar/');
  },
  filename: function(req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload an image.', 400), false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: multerFilter
});

/*
stores image in uploads folder
using mulkter and creates a reference to the file
*/

router.post('/uploadmulter', upload.single('imageData'), (req, res, next) => {
  var { path } = req.file.path;
  console.log('req.user in images', req.user);
  console.log('res.locals', res.locals);

  console.log('user /uploadmulter ', req.user);
  var user = req.user;
  var newImage = new Image({
    avatar: {
      _userId: user._id,
      imageName: req.file.filename,
      imageData: req.file.path
    }
  });

  newImage
    .save()
    .then(result => {
      res.status(200).send({
        success: true,
        document: result,
        path: req.file.path
      });
    })
    .catch(err => next(err));
});

module.exports = router;
