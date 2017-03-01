//App depencencies -----------------------------------------/
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');


var app = express();


//App middleware -------------------------------------------/
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/public"));
app.use(cookieParser());
app.use(session({ secret: 'library' }));


//Handlebars config ---------------------------------------/
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Route config -------------------------------------------/
require('./config/passport')(app);
require('./routes/htmlRoutes')(app);
require('./routes/apiRoutes')(app);
require('./routes/gameRoutes')(app);
var authRouter = require('./routes/authRoutes')(app);
app.use('/Auth', authRouter);
//Database config ---------------------------------------/

global.db = require('./models');

//Port config ---------------------------------------------------/
var PORT = process.env.PORT || 3000;

//Starting the server, syncing our models ------------------------------------/
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
        }
    });
});
