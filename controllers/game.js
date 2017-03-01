var user = require('../models/user.js');

module.exports = {
    renderGame: function(req, res) {
        // console.log('inside rederGame req.user =>');
        // console.log(req.user);
        // console.log('inside rederGame req.body =>');
        // console.log(req.body);
        if (req.user.id) {
            db.User.findOne({
                where: {
                    id: req.user.id
                }
            }).then(function(results) {
                // console.log(results);
                // console.log(results.dataValues.credits);
                // console.log(results.dataValues.id);
                res.render('game', {
                    msg: "Welcome! Win Big on Scratch Tickets!",
                    id: results.dataValues.id,
                    credits: results.dataValues.credits
                });
            })
        } else {
            db.User.findOne({
                where: {
                    name: req.user.userName
                }
            }).then(function(results) {
                // console.log(results.dataValues.credits);
                // console.log(results.dataValues.id);
                res.render('game', {
                    msg: "Welcome! Win Big on Scratch Tickets!",
                    id: results.dataValues.id,
                    credits: results.dataValues.credits
                });
            })
        }
    },
    addCredit: function(req, res) {
        // console.log('innside addCredit');
        // console.log(req.body);
        db.User.update({ credits: req.body.credits }, {
            where: {
                id: req.body.id
            }
        }).then(
            function(dbPost) {
            // console.log('inside addCredit');
            // console.log(req.user);
            // console.log(dbPost); 
            var userCredit = {
                id : req.body.id, 
                credits: req.body.credits
            }              
                res.json(userCredit);
              //  res.redirect('/game');
            }
        );


    }
}
