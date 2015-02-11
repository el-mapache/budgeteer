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

require('./config/passport.js')(passport, configs.development.auth);

var app = express();

app.set('port', process.env.PORT || 9090);

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('consolidate').handlebars);
app.set('view engine','html');

// log requests to console in development.
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(flash());

app.use(session({secret: configs.development.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());

var routes = require('./routes/index.js')(passport);

app.use('/build', express.static(__dirname + '/build'));
app.use('/', routes);

// All routes will sue this middleware to redirect in event of an error
app.use(function(req, res, next) {
  var err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

// DEV ONLY
if (process.env === 'development') {
  app.use(express.static(path.join(__dirname, 'public')));
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

var server = app.listen(app.get('port'), function() {
  morgan('Express server listening on port ' + server.address().port);
});
