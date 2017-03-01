var user = require('../models/user.js');

module.exports = {
    renderGame: function(req, res) {

        console.log('inside renderGame');
        // console.log(req.user);
        // console.log(req.body);
        if (req.user.id) {
            db.User.findOne({
                where: {
                    name: req.user.id
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
                console.log('updated success');
                res.redirect('/game');
            }
        );


    }
}
