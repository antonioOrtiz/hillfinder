import nextConnect from 'next-connect'

import auth from '../../../middleware/auth'
import Profile from '../../../models/Profile'

import connectDB from '../../../lib/mongodb';

import errorHandler from '../error-handler'

import emailValidator from '../../../lib/emailVaildator'

require('dotenv').config();

const handler = nextConnect()

handler
  .use(auth)
  .put((req, res, next) => {
    emailValidator(req, res, next, 'email');
  },
    async (req, res, next) => {
      await connectDB()
      const {
        profileUserAvatar,
        profileDisplayName,
        profileEmail,
        interestedActivities } = req.body;

      const update = {
        $set: {
          userAvatar: profileUserAvatar,
          email: profileEmail,
          "displayName": profileDisplayName,
          interestedActivities: interestedActivities
        }
      }

      const filter = { id: req.user.id };

      const updatedUser = await Profile.findOneAndUpdate(filter, update, {
        returnOriginal: false
      }).lean();

      try {
        console.log("updatedUser ", updatedUser);
        if (updatedUser) {
          return res.status(200).send({
            updatedUser,
            msg: `You have updated your profile!`
          });
        }
      } catch (error) {
        errorHandler(error, res)
      }

    })


export default handler;
