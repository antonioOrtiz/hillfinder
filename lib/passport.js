import passport from 'passport'
import LocalStrategy from 'passport-local'

const UserModel = require('./models/UserModel');

passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ username }).exec();
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

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id).exec();

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});


export default passport
