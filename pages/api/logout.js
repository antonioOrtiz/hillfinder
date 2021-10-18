import nextConnect from 'next-connect'
import auth from '../../middleware/auth'

import connectDB from '../../lib/mongodb';

import errorHandler from './error-handler';

const handler = nextConnect()

connectDB()

handler.use(auth).get((req, res) => {
  try {

    req.logout();
    return res.status(201).send({
      msg: ['Your have successfully logged out!']
    });
  } catch (err) {
    errorHandler(err, res)
  }
})

export default handler
