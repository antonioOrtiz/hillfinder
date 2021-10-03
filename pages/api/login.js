import nextConnect from 'next-connect'
import { check, body, validationResult } from 'express-validator'

import auth from '../../middleware/auth'
import User from '../../models/User'

import passport from '../../lib/passport'


import connectDB from '../../middleware/mongodb';

require('dotenv').config();


const handler = nextConnect()

connectDB()

handler
  .use(auth)
  .post([body('username').isEmail(), check('password').isLength({ min: 7, max: 11 })],
    (req, res, next) => {
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
        }
        next();

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
