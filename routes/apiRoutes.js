var testApiController = require('../controllers/testApi');
module.exports = function(app) {
    //apiRouter.use(function(req, res, next){
    // if (!req.user) {
    //     res.redirect('/');
    // }
  //  next();
    //});
    app.get('/test', testApiController.index);
};
