var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var multer = require('multer');
var session = require('express-session');
var configs = require('./config/env.js');
var flash = require('connect-flash');
var passport = require('passport');
var RedisStore = require('connect-redis')(session);


var app = express();

// DEV ONLY
if (app.get('env') === 'development') {
  // this has to be declared before passport, or else all static files will require a login check
  app.use('/build', express.static(path.join(__dirname, '/build')));
}

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('consolidate').handlebars);
app.set('view engine','html');

require('./config/passport.js')(passport, configs[app.get('env')].auth);

app.use(session({
  secret: configs.development.sessionSecret,
  resave: false,
  saveUnitialized: true,
  cookie: {
    maxAge: 3600000 * 24
  },
  store: new RedisStore({
    db: 2
  })
}));

// TODO: this installs passport for all routes.  might want to think about a subset
app.use(passport.initialize());
app.use(passport.session());


app.set('port', process.env.PORT || 9090);


// log requests to console in development.
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(flash());



var routes = require('./routes/index.js')(passport);


app.use('/', routes);

app.use(function(err, req, res, next) {
  console.log('ERROR Status', err, req.status)

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

var server = app.listen(app.get('port'), function() {
  morgan('Express server listening on port ' + server.address().port);
});
