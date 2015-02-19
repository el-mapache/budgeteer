var Transaction = require('../models').Transaction;
exports.new = function(req, res) {

};

exports.index = function(req, res) {
  var userId = req.session.passport.user;
  var budgetId = req.params.budgetId;

  res.format({
    html: function() {
      res.status(200).render('index');
    },

    json: function() {
      Transaction.allForBudget(userId, budgetId).then(function(transactions) {
        res.status(200).json({
          transactions: transactions
        });
      }).catch(function(err) {
        res.status(500).json({errors: [err]});
      });
    }
  });
};

exports.show = function(req, res) {
  Transaction.find({
    where: {
      BudgetId: req.params.budgetId,
      UserId: req.session.passport.user,
      id: req.params.transactionId
    }
  }).then(function(t) {
    if (t) {
      res.status(200).json({transactions: t});
    } else {
      res.status(404).render('404', {errors: [{ message: 'Transaction not found.'}]});
    }
  });
};

exports.create = function(req, res) {
  Transaction.addToBudget(req.session.passport.user, req.body.data).then(function(t) {
    res.status(201).json({
      message: 'Transaction successfully created.',
      transaction: t
    });
  }).catch(function(error) {
    res.status(400).json({errors: error});
  });
};

exports.update = function(req, res) {
  Transaction.find({
    where: {
      id: req.params.transactionId
    }
  }).then(function(transaction) {
    transaction.updateAttributes(req.body.data).then(function() {
      console.log('what are the arguments??', arguments);
    });
  });
};

exports.destroy = function(req, res) {
  Transaction.addToBudget(req.session.passport.user, req.body.data).then(function(t) {
    res.status(201).json({
      message: 'Transaction successfully created.',
      transaction: t
    });
  }).catch(function(error) {
    res.status(400).json({errors: error});
  });
};
