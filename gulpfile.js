var gulp = require('gulp');

function pgConnect(fn) {
  var fs = require('fs');
  var dbConfigs = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
  var pg = require('pg');
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
