var Budget = require('../models').Budget;

exports.index = function(req, res) {
  Budget.findAll().then(function(budgets) {
    res.json(budgets);
  }).catch(function(err) {
    res.json({error: err.message});
  }); 
};

exports.show = function(req, res) {

};

exports.create = function(req, res) {

};

exports.update = function(req, res) {

};

exports.destroy = function() {

};
