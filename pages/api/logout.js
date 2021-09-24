import nextConnect from 'next-connect'
import auth from '../../middleware/auth'

const handler = nextConnect()

handler.use(auth).get((req, res) => {
  req.logout();
  console.log('You have logged out!');
  return res.status(201).send({
    msg: ['Your have successfully logged out!']
  });
})

export default handler
