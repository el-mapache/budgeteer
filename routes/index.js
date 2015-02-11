var express = require('express');
var router = express.Router();
var budgets = require('./budgets.js');
var session = require('./sessions.js');
var registration = require('./registrations.js');


module.exports = function(passport) {
  router.get('/', function(req, res) {
    res.render('index');
  });

  router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
  router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/budgets',
    failureRedirect: '/signup'
  }), function(err, req, res, next) {
    console.log('Error authenticating.', err);

    res.status(500).send({
      message: err.message
    });
  });

  router.get('/login', session.new);
  router.post('/login', session.create);
  router.get('/logout', session.destroy);
  router.get('/signup', registration.new);
  router.post('/signup', registration.create);

  router.get('/budgets', budgets.index);
  router.get('/budgets/:id', budgets.show);
  router.post('/budgets/create', budgets.create);
  router.put('/budgets/:id', budgets.update);
  router.delete('/budgets/:id', budgets.destroy);

  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/');
  }
  return router;
};

