import nextConnect from 'next-connect'

import auth from '../../middleware/auth'

import dbConnect from '../../middleware/mongodb';

const handler = nextConnect()


handler
  .use(auth)
  .get(async (req, res) => {
    await dbConnect()

    if (req.user === undefined) {
      return res.json({ username: 'User not logged in' });
    }
    return res.json({
      userId: req.user._id
    });

  })

export default handler;
