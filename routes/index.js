var express = require('express');
var router = express.Router();
var budgets = require('./budgets.js');
var session = require('./sessions.js');
var registration = require('./registrations.js');
var transactions = require('./transactions.js');


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

  router.use('/budgets', isAuthenticated);
  router.use('/transactions', isAuthenticated);

  router.get('/login', session.new);
  router.post('/login', session.create);
  router.get('/logout', session.destroy);

  router.get('/signup', registration.new);

  router.get('/budgets', budgets.index);
  router.get('/budgets/new', budgets.new);
  router.get('/budgets/:budgetId', budgets.show);
  router.post('/budgets/create', budgets.create);
  router.put('/budgets/:budgetId', budgets.update);
  router.delete('/budgets/:budgetId', budgets.destroy);

  router.get('/budgets/:budgetId/transactions', transactions.index);
  router.get('/budgets/:budgetId/transactions/new', transactions.new);
  router.get('/budgets/:budgetId/transactions/:transactionId', transactions.show);
  router.post('/budgets/:budgetId/transactions/create', transactions.create);


  function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).redirect('/signup');
  }

  return router;
};

