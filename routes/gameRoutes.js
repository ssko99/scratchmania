var gameController = require('../controllers/game');
module.exports = function(app) {

    app.get('/game', gameController.renderGame);
    app.post('/game', gameController.addCredit);
};
