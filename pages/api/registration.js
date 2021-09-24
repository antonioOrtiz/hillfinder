import nextConnect from 'next-connect'

import auth from '../../middleware/auth'
import User from '../../models/UserModel'

import connectDB from '../../middleware/mongodb';

import nodeMailerFunc from '../../utils/index'


require('dotenv').config();

const handler = nextConnect()

handler
  .use(auth)
  .post(async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(409).send({
        msg: [
          'The email address you have entered is already associated with another account.',
          'Please re-enter another email address.'
        ]
      });
    }
    // Insert the new user if they do not exist yet
    user = new User({
      username: req.body.username,
      password: req.body.password
    });
    await user.save();
    nodeMailerFunc(
      user,
      `Account Verification`,
      `Hello, Welcome to Hillfinders! An app on the decline—er about declines!\nPlease verify your account by clicking the following link:\nhttp://${req.headers.host
      }/confirmed`,
      'verification email',
      res
    );
    return res.status(201).send({
      msg: [
        'Your user registration was successful.',
        'Please check your email to complete your registration!'
      ]
    });

  })

export default connectDB(handler);
