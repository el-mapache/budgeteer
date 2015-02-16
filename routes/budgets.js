var sequelize = require('sequelize');
var Budget = require('../models').Budget;
var User = require('../models').User;

exports.new = function(req, res) {
  res.status(200).render('index');
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
  var userId = req.session.passport.user;
  var budgetId = req.params.budgetId;

  Budget.oneForUser(userId, budgetId).then(function(budget) {
    res.format({
      html: function() {
        if (budget.length) {
          res.status(200).render('index', {budget: budget});
        } else {
          res.status(404).render('404', {errors: [{ message: 'Budget not found.'}]});
        }
      },

      json: function() {
        if (budget.length) {
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
  Budget.createForUser(req.session.passport.user, req.body.data).then(function(budget) {
    res.status(201).json({
      message: 'Budget successfully created.',
      budget: budget
    });
  }).catch(function(error) {
    res.status(400).json({errors: error});
  });
};

exports.update = function(req, res) {
  Budget.find({
    where: {
      id: req.params.budgetId
    }
  }).then(function(budget) {
    budget.updateAttributes(req.body.data).then(function() {
      console.log('what are the arguments??', arguments);
    });
  });
};

exports.destroy = function(req, res) {
  Budget.find({
    where: {
      id: req.params.budgetId
    }
  }).then(function(budget) {
    if (!budget) {
      res.status(404).json({errors: [{ message: 'Budget not found.'}]});
    }

    budget.destroy().then(function() {
      res.status(200).json({
        message: 'Budget successfully deleted.',
        budget: budget
      });
    });
  });
};
