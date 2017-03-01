var express = require('express');
var authRouter = express.Router();
var db = require('../models');
var passport = require('passport');

module.exports = function(app) {
    authRouter.route('/signUp')
        .post(function(req, res) {
            console.log(req.body);
            db.User.create({
                name: req.body.userName,
                password: req.body.password
            }).then(
                function(dbPost) {
                    req.login(req.body, function() {
                        res.redirect('/game');
                    });

                });          
        });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            res.redirect('/game');
        });
    authRouter.route('/profile')
        .all(function(req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function(req, res) {
            res.json(req.user);
        });
   
    return authRouter;
};
