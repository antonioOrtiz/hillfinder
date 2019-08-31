var passport = require('passport');
var localStrategy = require('passport-local');
var UserModel = require('../models/UserModel');


passport.use(newLocalStrategy({ username_email: 'username' }, async(username, password, done) => {
    try {
        var user = await UserModel.findOne({ username_email: username }).exec();
        if (!user) {
            return done(null, false, { message: 'Invalid username or password' })
        }
        var passwordOk = await user.comparePassword(password);
        if (!passwordOk) {
            return done(null, false, { message: 'Invalid username or password' })

        }
        return done(null, user)
    } catch (err) {
        return done(err)
    }
}))

passport.serializeUser((user, done) => {
    return done(null, user._id)
})

passport.deserializeUser(async(id, done) => {
    try {
        var user = await UserModel.findById(id).exec();
        return done(null, user);
    } catch (err) {
        return done(err)
    }
})

module.exports = {
    initialize: passport.initialize(),
    session: passport.session(),
    setUser: (req, res, next) => {
        res.locals.user = req.user;
        next();
    }
}