var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var flatten = require('gulp-flatten');
var copy = require('gulp-copy');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var to5ify = require('6to5ify');

var PATHS = {
  JS: ['./src/**/*.js', './src/**/*.jsx', '!./src/**/*-test.js'],
  SASS: ['./assets/stylesheets/**/*.sass', './assets/stylesheets/**/*.scss']
};

gulp.task('js', function () {
  return gulp.src('./src/index.js')
    .pipe(concat('bundle.js'))
    .pipe(browserify({
      transform: [reactify, to5ify]
    })).on('prebundle', function(bundler) {
      bundler.require('react');
    })
    .pipe(gulp.dest('./build/js'));
});

gulp.task('css', function() {
  return gulp.src(PATHS.SASS)
    .pipe(sass())
    .pipe(flatten())
    //.pipe(rename({suffix: '.min'}))
    //.pipe(minifycss())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', function() {
  gulp.watch(PATHS.SASS, ['css']).on('error', function(e) {
    console.log(e);
  });
  gulp.watch(PATHS.JS, ['js']).on('error', function(e) {
    console.log(e);
  });
});

gulp.task('default', ['watch']);

gulp.task('db:create', function() {
  pgConnect(function(dbEnv, client, done) {
    client.query('CREATE DATABASE ' + dbEnv.database, function(err) {
      if (err) {
        console.log('Error creating database ' + dbEnv.database + '. ', err.message);
      }

      console.log('Database ' + dbEnv.database + ' created.');
      client.end();
    });
  });
});

gulp.task('db:drop', function() {
  pgConnect(function(dbEnv, client, done) {
    client.query('DROP DATABASE IF EXISTS ' + dbEnv.database, function(err) {
      console.log('Database ' + dbEnv.database + ' dropped.');
      client.end();
    });
  });
});

gulp.task('db:sync', function() {
  var models = require('./models');
  models.sequelize.sync().complete(function(syncError) {
    if (syncError) {
      return console.log(syncError.message);
    }

    console.log('Models synced successfully.');
  });
});

// Utilz
function pgConnect(fn) {
  var fs = require('fs');
  var pg = require('pg');

  var dbConfigs = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
  var env = process.env.ENVIRONMENT || 'development';

  var dbEnv = dbConfigs[env];
  var connection = 'postgres://' + dbEnv.username + ':' + dbEnv.password + '@' + dbEnv.host + '/postgres';

  pg.connect(connection, function(err, client, done) {
    if (err) {
      console.log('Error connecting to postgres! ' + err.message);
      return;
    }

    fn(dbEnv, client, done);
  });
}

function es6Reactify(file) {
  return reactify(file, {es6: true});
}
