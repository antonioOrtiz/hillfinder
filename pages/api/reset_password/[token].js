import nextConnect from 'next-connect'

import auth from '../../../middleware/auth'
import User from '../../../models/User'
import Token from '../../../models/Token'


import connectDB from '../../../middleware/mongodb';

import nodeMailerFunc from '../../../utils/index'


require('dotenv').config();

const handler = nextConnect()

handler
  .use(auth)
  .post((req, res, next) => {
    const {
      query: { token },
    } = req
    try {
      Token.findOne({ token }, (err, innerToken) => {
        if (innerToken === null) {
          return res.status(401).send({
            msg: ['We were unable to find a valid token. Your token my have expired.']
          });
        }
        if (innerToken) {
          User.findOne({ _id: innerToken._userId }, (err, user) => {
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
                  `You may now login with your new password—${req.body.password}`,
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
  })

export default connectDB(handler);
