var Store = require('./store.js')();
var BudgetUsersActions = require('../actions/budget-users-actions.js');
var request = require('superagent');

module.exports =  Store.create({
  init: function() {
    this.bindToActions(BudgetUsersActions);
  },

  getInitialState: function() {
    return {
      user: {},
      errors: []
    };
  },

  onCreate: function(data) {
    request.post('/budgets/' + data.budgetId + '/add-user')
    .set('Accept', 'application/json')
    .send({ data: data })
    .end(function(response) {
      console.log(response)
      this.setState(this.merge(this.getState(), response.body));
    }.bind(this));
  }
});
