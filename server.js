var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var multer = require('multer');

var routes = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('consolidate').handlebars);
app.set('view engine','html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);

// not sure how this only catches 404s? Need to investigate.
app.use(function(req, res, next) {
  var err = new Error('Not Found!');
  err.status = 404;
  next(err);
});

// DEV ONLY
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.set('port', process.env.PORT || 9090);
var server = app.listen(app.get('port'), function() {
  logger('Express server listening on port ' + server.address().port);
});

