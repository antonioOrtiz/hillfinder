import nextConnect from 'next-connect'

import auth from '../../../middleware/auth'
import User from '../../../models/User'
import Token from '../../../models/Token'


import connectDB from '../../../middleware/mongodb';

require('dotenv').config();

const handler = nextConnect()

handler
  .use(auth)
  .get((req, res, next) => {
    const {
      query: { token },
    } = req

    try {
      Token.findOne({ token }, (err, token) => {
        if (token === null) {
          console.log('We were unable to find a valid token 404 ', 404);
          return res.status(404).send({
            msg: ['We were unable to find a valid token. Your token my have expired.']
          });
        }
        // If we found a token, find a matching user

        if (token) {
          User.findOne({ _id: token._userId }, (err, user) => {
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
              user.update({ isVerified: true }, (err) => {
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
  })

export default connectDB(handler);
