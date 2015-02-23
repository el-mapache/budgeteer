var Store = require('./store.js')();
var BudgetActions = require('../actions/budget-actions.js');
var request = require('superagent');

module.exports =  Store.create({
  init: function() {
    this.bindToActions(BudgetActions);
  },

  getInitialState: function() {
    return {
      budgets: [],
      errors: [],
      editing: false,
      creating: true,
      message: ''
    };
  },

  onCreate: function(data) {
    request.post('/budgets/create')
    .set('Accept', 'application/json')
    .send({ data: data })
    .end((response) => {
      var stateDelta = this.merge(response.body, {creating: false});
      this.setState(this.merge(this.getState(), stateDelta));
    });
  },

  onGetAll: function() {
    request.get('/budgets')
    .set('Accept', 'application/json')
    .end((response) => {
      this.setState(this.merge(this.getState(), response.body));
    });
  },

  onGet: function(data) {
    request.get('/budgets/' + data.budgetId)
    .set('Accept', 'application/json')
    .end((response) => {
      if (response.body.budget) {
        var stateDelta = {budgets: response.body.budget};
        this.setState(this.merge(this.getState(), stateDelta));
      }
    });
  },

  onUpdate: function(data) {},

  onDestroy: function(data) {},

  onNew: function() {
    var previousState = this.getState();
    var newState = {
      creating: true
    };

    this.setState(this.merge(previousState, newState));
  }
});
