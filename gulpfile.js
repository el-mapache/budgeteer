var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var flatten = require('gulp-flatten');
var copy = require('gulp-copy');
var browserify = require('gulp-browserify');
var browserReg = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
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
    .pipe(gulp.dest('/Users/Taco/Documents/code/budgeteer-rails/app/assets/javascripts/bundle.js'));
});

gulp.task('css', function() {
  return gulp.src(PATHS.SASS)
    .pipe(sass())
    .pipe(flatten())
    .pipe(concat('styles.css'))
    //.pipe(rename({suffix: '.min'}))
    //.pipe(minifycss())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('watchCSS', function() {
  gulp.watch(PATHS.SASS, ['css']).on('error', function(e) {
    console.log(e);
  });
});

gulp.task('watchJS', function() {
  return watchifyScript();
});

gulp.task('default', ['watchJS', 'watchCSS']);

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
  models.sequelize.sync({force: true}).complete(function(syncError) {
    if (syncError) {
      return console.log(syncError.message);
    }

    console.log('Models synced successfully.');
  });
});

gulp.task('db:setup', ['db:drop', 'db:create', 'db:sync']);

// Utilz
function watchifyScript() {
  var bundler = browserReg({
    entries: ['./src/index.js'],
    transform: [reactify, to5ify],
    debug: false,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  var rebundle = function() {
    watcher.bundle()
           .pipe(source('bundle.js'))
           .pipe(gulp.dest('/Users/Taco/Documents/code/budgeteer-rails/app/assets/javascripts'));
           //.pipe(gulp.dest('./build/js'));
    console.log('js compiled');
  }

  var watcher = watchify(bundler);

  // for some reason this is necessary to get watchify to work.
  rebundle();

  watcher.on('update', rebundle);
  return rebundle;
}

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
