import nextConnect from 'next-connect'
import auth from '../../middleware/auth'

import connectDB from '../../middleware/mongodb';


const handler = nextConnect()

connectDB()

handler.use(auth).get((req, res) => {

  req.logout();
  return res.status(201).send({
    msg: ['Your have successfully logged out!']
  });
})

export default handler
