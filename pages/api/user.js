import nextConnect from 'next-connect'

import auth from '../../middleware/auth'

import connectDB from '../../middleware/mongodb';

const handler = nextConnect()

connectDB()

handler
  .use(auth)
  .get(async (req, res) => {
    console.log("req line 14", req.user);


    if (req.user === undefined) {
      return res.json({ username: 'User not logged in' });
    }

    res.json({ user: req.user })
  })

export default handler;
