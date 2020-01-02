var router = require('express').Router();
var passport = require('passport');
var UserModel = require('../models/UserModel');
var { check, body, validationResult } = require('express-validator');

router.route('/login')
    .get(function(req, res) {
        UserModel.find({}, (err, users) => {
            if (err) res.status(404).send({ error: req.query.error })
            res.json(users)
        })
    })
    .post((req, res, next) => {
        console.log('/login, req.body: ');
       
        console.log(req.body)
        next()
    },  passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    })


router.route('/registration')
    .get(function(req, res) {
        UserModel.find({}, (err, users) => {
            if (err) res.status(500).send(err)
            res.json(users)
        })

    })
    .post(body('username').custom(value => {
        return UserModel.findOne({ 'username': value }).then(user => { // Return Promise
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

            console.log("savedUser ", savedUser);
            if (savedUser) return res.redirect('/users/registration?success=true');
            return next(new Error('Failed to save user for unknown reasons'))
        } catch (err) {
            return next(err)
        }
    })

module.exports = router