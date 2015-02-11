var Budget = require('../models').Budget;

exports.index = function(req, res) {
  Budget.findAll({
    attributes: Budget.publicParams
  }).then(function(budgets) {
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
  Budget.create(req.body.data).success(function(budget) {
    res.status(201).json({message: 'Budget successfully created.', budget: budget});
  }).error(function(error) {
    console.log('error', error)
    Budget.build(req.body.data).validate().then(function() {
      console.log('y no valid', arguments)
    })
    res.status(400).json({errors: error});
  });
};

exports.update = function(req, res) {

};

exports.destroy = function() {

};
