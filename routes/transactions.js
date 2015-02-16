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
      Transaction.allForBudget(userId, budgetId).then(function(budgets) {
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

};

exports.create = function(req, res) {
  Transaction.addToBudget(req.session.passport.user, req.body).then(function(t) {
    res.status(201).json({
      message: 'Transaction successfully created.',
      transaction: t
    });
  }).catch(function(error) {
    res.status(400).json({errors: error});
  });
};
