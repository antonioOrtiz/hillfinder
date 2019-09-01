var router = require('express').Router();
var UserModel = require('../models/UserModel');
var passport = require('passport');
var { body, validationResult } = require('express-validator');

router.route('/login')
    .post(passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login?error=true'
    }))
    .get((req, res) => { res.render('users/login', { error: req.query.error }) });



router.route('/registration')
    .get(function(req, res) {
        // UserModel.find({}, (err, users) => {
        //     if (err) res.status(500).send(err)
        //     res.json(users)
        // })
        if (err) res.status(404)
        res.json(req.query.success)
    })
    .post(body('username_email').custom(value => {
        return UserModel.findOne({ 'username_email': value }).then(user => { // Return Promise
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    }), async(req, res, next) => {
        // Checks for errors in validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(409).json({ errors: errors.array() });
        }
        try {
            let newUser = new UserModel(req.body)
            let savedUser = await newUser.save()

            if (savedUser) return res.redirect('/users/registration?success=true');
            return next(new Error('Failed to save user for unknown reasons'))
        } catch (err) {
            return next(err)
        }
    })

module.exports = router