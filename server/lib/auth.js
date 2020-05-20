var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserModel = require('../models/userModel');

passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ username: username }).exec();
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

// eslint-disable-next-line no-underscore-dangle
passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id).exec(); //exec is used to get a real Promise

    console.log('user deserialUser', user);
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = {
  initialize: passport.initialize(),
  session: passport.session()
};
