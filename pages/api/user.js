import nextConnect from 'next-connect'
import auth from '../../middleware/auth'


const handler = nextConnect()

handler
  .use(auth)
  .get((req, res) => {
    if (req.user != undefined && req.user.isVerified) {
      const { id, isVerified } = req.user
      res.status(200).send({ user: { id, isVerified } })
    } else {
      res.status(401).json({
        user: null,
      })
    }
  });


export default handler
