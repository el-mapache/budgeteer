var Store = require('./store.js')();
var BudgetUsersActions = require('../actions/budget-users-actions.js');
var request = require('superagent');
var csrf = require('../mixins/csrf-util.js');

module.exports =  Store.create({
  init: function() {
    this.bindToActions(BudgetUsersActions);
  },

  onCreate: function(data) {
    request.post('/budgets/' + data.budget_id + '/budget_users')
    .set('Accept', 'application/json')
    .set('X-CSRF-Token', csrf.getToken())
    .send(data)
    .end(function(response) {
      if (response.error) {
        console.log('Something went wrong adding a user.');
      } else {
        return BudgetUsersActions.createSuccess({
          budgetUser: response.body.budget_user
        });
      }
    }.bind(this));
  }
});
