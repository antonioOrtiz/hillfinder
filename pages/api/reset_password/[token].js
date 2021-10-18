import nextConnect from 'next-connect'

import auth from '../../../middleware/auth'
import { check, body, validationResult } from 'express-validator'

import errorHandler from '../error-handler'
import User from '../../../models/User'
import Token from '../../../models/Token'


import connectDB from '../../../lib/mongodb';

import { nodeMailerFunc } from '../../../utils/index'




require('dotenv').config();

const handler = nextConnect()

connectDB()

handler
  .use(auth)
  .post(async (req, res) => {


    // console.log("hasErrors ", hasErrors);
    // if (hasErrors) {
    //   console.log('has errors!')
    //   return res.status(422).json({
    //     msg: [
    //       'Please follow the validations above',
    //       're-enter a proper email and/or password.'
    //     ]
    //   })
    // }

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
      return errorHandler(err, res);
    }
  })

export default handler;
