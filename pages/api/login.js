import nextConnect from 'next-connect'
import { check, body, validationResult } from 'express-validator'

import auth from '../../middleware/auth'
import initMiddleware from '../../middleware/init-middleware'
import validateMiddleware from '../../middleware/validate-middleware'

import User from '../../models/User'

import passport from '../../lib/passport'

import connectDB from '../../middleware/mongodb';

require('dotenv').config();

const validateBody = initMiddleware(
  validateMiddleware([
    body('username').isEmail(),
    check('password').isLength({ min: 7, max: 11 }),
  ], validationResult)
)


const handler = nextConnect()

connectDB()

handler
  .use(auth)
  .post(async (req, res, next) => {
    await validateBody(req, res)

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        msg: [
          'Please follow the validations above',
          're-enter a proper email and/or password.'
        ]
      })
    }

    User.findOne({ username: req.body.username }).then(user => {

      console.log("user ", user);
      if (!user) {
        return res.status(404).json({
          msg: [
            'We were unable to find this user.',
            'This email may be incorrect. Please confirm with the "Forgot password" link above or the "Register" link below!.'
          ]
        });
      }
      return res.status(401).json({
        msg: [
          'This email and/or password combo may be incorrect',
          'Please confirm with the "Forgot password" link above or the "Register" link below!'
        ]
      })
    });
  },

    passport.authenticate('local', { session: true }),

    (req, res) => {
      const user = req.user;
      if (user.isVerified === false) {
        return res.status(403).send({
          msg: [
            'Your username has not been verified!',
            'Check your email for a confirmation link.'
          ]
        });
      }
      return res.status(200).send({
        userId: user,
        msg: [`Your have successfully logged in;`, `Welcome to Hillfinder!`]
      });
    })


export default handler;
