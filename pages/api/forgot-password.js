/* eslint-disable consistent-return */
import nextConnect from 'next-connect'

import auth from '../../middleware/auth'
import User from '../../models/User'

import connectDB from '../../lib/mongodb';

import { nodeMailerFunc } from '../../utils/index';
import errorHandler from './error-handler';
import emailValidator from '../../lib/emailVaildator'

require('dotenv').config();

const handler = nextConnect()

handler
  .use(auth)
  .post(async (req, res) => {
    await connectDB()

    if (emailValidator(req, res, 'email')) {
      return
    }

    try {
      User.findOne(
        {
          email: req.body.email
        },
        (err, user) => {

          if (user == null) {
            return res.status(404).send({
              msg:
                'We were unable to find this user. Please re-enter another email address, or click the link below to register.'
            });
          } else if (user) {
            user.generatePasswordReset();
            user.save(() => {
              nodeMailerFunc(
                user,
                `Your password has been reset`,
                `Click the following link to reset your password:\nhttp://${req.headers.host
                }/update-password`,
                'email to update your password',
                res
              );
            });
            return res.status(200).send({
              msg:
                'Your password has been reset! Please check your email for the link which will allow you to reset your password!'

            });
          }
        }
      );
    } catch (err) {
      errorHandler(err, res)
    }
  })


export default handler;





