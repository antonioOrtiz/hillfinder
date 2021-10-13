import passport from 'passport'
import LocalStrategy from 'passport-local'

import User from '../models/User'

passport.use(
  new LocalStrategy(
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
          return done(null, false, { message: 'Invalid email!' });
        }
        const passwordOk = await user.comparePassword(password);

        if (!passwordOk) {
          return done(null, false, {
            message: 'Invalid password!'
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});


export default passport
