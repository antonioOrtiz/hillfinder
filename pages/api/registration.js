import nextConnect from 'next-connect'
import mongoose from 'mongoose';
import auth from '../../middleware/auth'
import User from '../../models/User'
import Profile from '../../models/Profile'
console.log("Profile ", Profile);


import connectDB from '../../lib/mongodb';

import { nodeMailerFunc } from '../../utils/index'

import errorHandler from './error-handler'

import emailValidator from '../../lib/emailVaildator'

require('dotenv').config();

const handler = nextConnect()

handler
  .use(auth)
  .post((req, res, next) => {
    emailValidator(req, res, next, 'email', 'password');
  },
    async (req, res, next) => {
      await connectDB();


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
          _id: new mongoose.Types.ObjectId(),
          password: req.body.password
        });

        const profile = new Profile({ _user: user._id });

        await user.save();
        await profile.save();
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
