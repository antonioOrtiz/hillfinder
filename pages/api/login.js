import nextConnect from 'next-connect'

import auth from '../../middleware/auth'
import passport from '../../lib/passport'

import connectDB from '../../lib/mongodb';

import errorHandler from './error-handler'

import emailValidator from '../../lib/emailVaildator'


const handler = nextConnect()

handler.use(auth).post(
  async (req, res, next) => {
    await connectDB();

    emailValidator(req, res, next, 'email', 'password')

    passport.authenticate('local', (err, user, info) => {

      if (err) { return errorHandler(err, res) }

      if (user) {
        if (user.isVerified) {
          return res.status(200).send({
            userId: user._id,
            msg: `Your have successfully logged in; Welcome to Hillfinder!`
          });
        }
        return res.status(403).send({
          msg: 'Your username has not been verified! Check your email for a confirmation link.'
        });
      }

      else if (user === false) {

        res.status(404).send({
          msg: `We were unable to find this user. Please confirm with the "Forgot password" link or the "Register" link below!`
        })

      }

    })(req, res, next);
  })

export default handler
