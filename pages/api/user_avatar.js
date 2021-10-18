import nextConnect from 'next-connect'
import cloudinary from 'cloudinary';

import auth from '../../middleware/auth'

import connectDB from '../../lib/mongodb';

const handler = nextConnect()


const { v2: cloudinaryV2 } = cloudinary

connectDB()


handler
  .use(auth)
  .get((req, res, next) => {
    try {
      cloudinaryV2.api.resources_by_tag(`userId=${req.user._id}`, (error, result) => {
        if (error) {
          return res.send({ error });
        }

        return res.send({
          avatar_info: result.resources[0]
        });
      });
    } catch (error) {
      res.status(500).json({ error: `User hasn't logged in yet` });
    }
  })

export default handler;
