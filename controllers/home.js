
module.exports = {
  renderHome: function(req, res) {
    res.render('index', {
      msg: "Welcome! Win Big on Scratch Tickets!"
    });
  
  }
};
