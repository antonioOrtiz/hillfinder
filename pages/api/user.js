import nextConnect from 'next-connect'
import auth from '../../middleware/auth'

const handler = nextConnect()

handler
  .use(auth)
  .get((req, res) => {
    if (req.user != undefined && req.user.isVerified) {
      const { id, isVerified } = req.user
      res.json({ user: { id, isVerified } })
    } else {
      res.json(null)
    }
  })

export default handler
