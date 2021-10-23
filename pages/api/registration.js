import nextConnect from 'next-connect'

import auth from '../../middleware/auth'
import User from '../../models/User'

import connectDB from '../../lib/mongodb';

import { nodeMailerFunc } from '../../utils/index'

import errorHandler from './error-handler'

import emailValidator from '../../lib/emailVaildator'

require('dotenv').config();

const handler = nextConnect()

handler
  .use(auth)
  .post(async (req, res, next) => {
    await connectDB();

    emailValidator(req, res, next, 'email', 'password')

    let user = await User.findOne({ email: req.body.email });
    try {
      if (user) {
        return res.status(409).send({
          msg:
            `The email address you have entered is already associated with another account.
            Please re-enter another email address.`
        });
      }
      user = new User({
        email: req.body.email,
        password: req.body.password
      });
      await user.save();
      nodeMailerFunc(
        user,
        `Account Verification`,
        `Hello, Welcome to Hillfinders! An app on the decline—er about declines!\nPlease verify your account by clicking the following link:\nhttp://${req.headers.host
        }/confirmation`,
        'verification email',
        res
      );
      return res.status(201).send({
        msg:
          `Your user registration was successful. Please check your email to complete your registration!`
      });
    } catch (err) {
      errorHandler(err, res)
    }
  })

export default handler;
