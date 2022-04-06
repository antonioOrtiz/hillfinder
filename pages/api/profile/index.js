import nextConnect from 'next-connect'
import auth from '../../../middleware/auth'

import Profile from '../../../models/Profile'
import errorHandler from '../error-handler'
import emailValidator from '../../../lib/emailVaildator'


const handler = nextConnect()

handler
  .use(auth)
  .get(async (req, res) => {
    Profile.find({ id: req.user.id })
      .populate('_user', 'email')

      .exec((err, profile) => {
        if (err) return errorHandler(err);
        console.log('res', profile);
        return res.status(201).send(profile)
      });
  })
  .put(async (req, res, next) => {
    emailValidator(req, res, next, 'email');
    Profile.findOneAndUpdate({ id: req.user.id })
      .lean()
      .populate('_user', 'email')

      .exec((err, profile) => {
        if (err) return errorHandler(err);

        console.log("req ", req.body);
        console.log('res', profile);

      });
  },
  )

export default handler
