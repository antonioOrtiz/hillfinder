import nextConnect from 'next-connect'

import auth from '../../middleware/auth'
import passport from '../../lib/passport'

import connectDB from '../../lib/mongodb';

import errorHandler from './error-handler'

import emailValidator from '../../lib/emailVaildator'

const handler = nextConnect()

handler
  .use(auth)
  .post((req, res, next) => {
    emailValidator(req, res, next, 'email', 'password');
  },

    async (req, res, next) => {
      await connectDB();
      next()
    },
    (req, res, next) => {
      passport.authenticate('local', (err, user, info) => {
        if (err) { return errorHandler(err, res); }
        if (user === false) {
          return res.status(404).send({
            msg: `We were unable to find this user. Please confirm with the "Forgot password" link or the "Register" link below!`
          });
        }
        req.logIn(user, (err) => {
          if (err) { return errorHandler(err, res); }
          if (user.isVerified) {
            return res.status(200).send({
              user,
              msg: `Your have successfully logged in; Welcome to Hillfinder! You will be redirected to your profile page!`
            });
          }
          return res.status(403).send({
            msg: 'Your username has not been verified! Check your email for a confirmation link.'
          });
        });
      })(req, res, next);
    })

export default handler



