/* eslint-disable consistent-return */
import nextConnect from 'next-connect'

import auth from '../../middleware/auth'
import User from '../../models/User'

import connectDB from '../../middleware/mongodb';

import { nodeMailerFunc } from '../../utils/index';
import errorHandler from './error-handler';

require('dotenv').config();

const handler = nextConnect()

connectDB()

handler
  .use(auth)
  .post((req, res, next) => {
    // Checks for errors in validation
    try {
      User.findOne(
        {
          email: req.body.email
        },
        (err, user) => {
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
                `Click the following link to reset your password:\nhttp://${req.headers.host
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
      errorHandler(err, res)
    }
  })


export default handler;





