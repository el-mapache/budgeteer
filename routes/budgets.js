var sequelize = require('sequelize');
var Budget = require('../models').Budget;
var User = require('../models').User;

exports.new = function(req, res) {
  res.status(200).render('index', {
    budgets: JSON.stringify({})
  });
};

exports.index = function(req, res) {
  var userId = req.session.passport.user
  res.format({
    html: function() {
      res.status(200).render('index');
    },

    json: function() {
      Budget.allForUser(userId).then(function(budgets) {
        res.status(200).json({
          budgets: budgets
        });
      }).catch(function(err) {
        res.status(500).json({errors: [err]});
      });
    }
  });
};

exports.show = function(req, res) {
  Budget.oneForUser(1,6).then(function(budget) {
    res.format({
      html: function() {
        if (budget) {
          console.log(budget)
          res.status(200).render('index', {budget: budget});
        } else {
          res.status(404).json({errors: [{ message: 'Budget not found.'}]});
        }
      },

      json: function() {
        if (budget) {
          res.status(200).json({budget: budget});
        } else {
          res.status(404).json({errors: [{ message: 'Budget not found.'}]});
        }
      }
    });
  }).catch(function(error) {
    console.log('ERROR', error);
    res.status(500).json({errors: [error]});
  });
};

exports.create = function(req, res) {
  User.createBudget(1, req.body.data).then(function(budget) {
    console.log('budget?', budget);
    res.status(201).json({message: 'Budget successfully created.', budget: budget});
  }).catch(function(error) {
    console.log(error)
    res.status(400).json({errors: error});
  });
};

exports.update = function(req, res) {

};

exports.destroy = function() {

};
