import nextConnect from 'next-connect'

import passport from 'lib/passport'
import session from 'lib/session'
import connectDB from 'lib/mongodb'

const auth = nextConnect()
  .use(
    session({
      name: 'sess',
      secret: process.env.TOKEN_SECRET,
      cookie: {
        maxAge: 60 * 60 * 8, // 8 hours,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      },
    })
  )
  .use(async (req, res, next) => {
    await connectDB();
    if (req.user) {
      res.locals.user = req.user;
    }
    next()
  })
  .use(passport.initialize())
  .use(passport.session())

export default auth



