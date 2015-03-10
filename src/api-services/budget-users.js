var superagent = require('superagent');

var URI = function(budgetId) {
  return 'budgets/' + budgetId + '/add-user';
};

var request = function(method, budgetId) {
  method = method.toLowerCase();

  return superagent[method](URI(budgetId))
         .set('Accept', 'application/json');
};


var BudgetUsersAPIService = function() {
  create: function(budgetId, data) {
    request('post',budgetId)
    .send(data)
    .end(function() {
      // send afterCreate action I guess.
    });
  }
};

module.exports = BudgetUsersAPIService;
