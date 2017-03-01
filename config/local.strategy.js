var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var db = require('../models');


module.exports = function() {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function(username, password, done) { //determine 
           
            db.User.findOne({
                where: {
                    name: username
                }
            }).then(function(results) {              

                if (results && results.dataValues.password === password) {
                      console.log(results.dataValues);
                    done(null, results.dataValues);
                } else {
                    done(null, false, { message: 'Bad password' });
                }
            });
        }
    ));
};
