var Budget = require('../models').Budget;

exports.create = function(req, res) {
  var budgetId = req.params.budgetId;
  var userId = req.session.passport.user.id;
  var emailToAdd = req.body.data.email;

  Budget.addUser(userId, budgetId, emailToAdd).then(function(user) {
    if (user) {
      res.status(200).json({
        user: user,
        message: 'User successfully added to budget.'
      });
    } else {
      res.status(400).json({errors: [{message: 'Could not add user to budget.'}]});
    }
  });
};
