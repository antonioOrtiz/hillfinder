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

      passport.authenticate('local', (err, user, info) => {
        console.log("user ", user);

        if (err) { return errorHandler(err, res) }
        if (user === false) {
          return res.status(404).send({
            msg: `We were unable to find this user. Please confirm with the "Forgot password" link or the "Register" link below!`
          })

        }
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
      })(req, res, next);


    })

export default handler
