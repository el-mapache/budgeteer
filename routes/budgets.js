var sequelize = require('sequelize');
var Budget = require('../models').Budget;
var User = require('../models').User;

exports.new = function(req, res) {
  res.status(200).render('index', {
    budgets: JSON.stringify({})
  });
};

exports.index = function(req, res) {
  // TODO swap this to Budgets.getAllByUser
  User.allBudgets(1).then(function(budgets) {
    res.format({
      html: function() {
        res.status(200).render('index', {
          budgets: JSON.stringify(budgets)
        });
      },

      json: function() {
       res.status(200).json({
          budgets: budgets
        });
      }
    });
  }).catch(function(err) {
    res.status(500).json({errors: [err]});
  });
};

exports.show = function(req, res) {
  Budget.find({
    where: {
      id: req.params.id
    },
    attributes: Budget.publicParams
  }).then(function(budget) {
    if (budget) {
      res.status(200).json({budget: budget});
    } else {
      res.status(404).json({errors: [{ message: 'Budget not found.'}]});
    }
  }).catch(function(errors) {
    res.status(500).json({errors: [{message: 'The server encountered an error.'}]});
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
