import passport from 'passport'
import LocalStrategy from 'passport-local'

import User from 'models/User'

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email }).exec();

        if (!user) {
          return done(null, false, { message: 'Invalid username!' });
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

export default passport
