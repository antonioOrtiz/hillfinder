import passport from 'passport'
import LocalStrategy from 'passport-local'

import User from '../models/User'


passport.serializeUser((user, done) => {
  done(null, user.id);
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

// passport.use(new LocalStrategy({
//   // by default, local strategy uses username and password, we will override with email
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true // allows us to pass back the entire request to the callback
// },
//   (req, email, password, done) => {
//     User.findOne({ email }, (err, user) => {
//       console.log("user passport 16", user);

//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.comparePassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ))




export default passport
