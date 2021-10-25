import nextConnect from 'next-connect'
import auth from '../../middleware/auth'

const handler = nextConnect()

handler
  .use(auth)
  .get((req, res) => {
    // You do not generally want to return the whole user object
    // because it may contain sensitive field such as !!password!! Only return what needed

    // const { _id } = req.user
    // res.json({ user: { _id } })
    console.log("in api/user req.user ", req.user);


    if (req.user) {
      const { _id } = req.user
      res.json({ user: { _id } })
    } else {
      res.json({ user: null })
    }

  })
// .post((req, res) => {
//   const { username, password, name } = req.body
//   createUser(req, { username, password, name })
//   res.status(200).json({ success: true, message: 'created new user' })
// })
// .use((req, res, next) => {
//   // handlers after this (PUT, DELETE) all require an authenticated user
//   // This middleware to check if user is authenticated before continuing
//   if (!req.user) {
//     res.status(401).send('unauthenticated')
//   } else {
//     next()
//   }
// })
// .put((req, res) => {
//   const { name } = req.body
//   const user = updateUserByUsername(req, req.user.username, { name })
//   res.json({ user })
// })
// .delete((req, res) => {
//   deleteUser(req)
//   req.logOut()
//   res.status(204).end()
// })

export default handler
