var Store = require('./store.js')();
var BudgetUsersStore = require('./budget-users-store.js');
var BudgetActions = require('../actions/budget-actions.js');
var request = require('superagent');
var models = require('../models/models.js');
var csrf = require('../mixins/csrf-util.js');
var _ = require('underscore');

var currentBudgetId = null;

module.exports =  Store.create({
  init: function() {
    this.bindToActions(BudgetActions);
    BudgetUsersStore.listenTo(this.mergeUsers, this);
  },

  getInitialState: function() {
    return {
      budgets: [],
      errors: [],
      currentBudget: null,
      editing: false,
      creating: true,
      message: ''
    };
  },

  currentBudget: function(id) {
    return _.findWhere(this.budgets, {id: id}) || models.Budget.build();
  },

  budgets: function() {
    return this.getState().budgets;
  },

  mergeUsers: function(data) {
    console.log(data);
  },

  onCreate: function(data) {
    request.post('/budgets')
    .set('Accept', 'application/json')
    .set('X-CSRF-Token', csrf.getToken())
    .send({ budget: data })
    .end(function(response) {
      if (!response.error) {
        var stateDelta = this.merge(response.body, {creating: false});
        this.setState(this.merge(this.getState(), stateDelta));
      }

      this.setState(this.merge(this.getState(), response.body));
      console.log(this.getState());
    }.bind(this));
  },

  onGetAll: function() {
    request.get('/budgets')
    .set('Accept', 'application/json')
    .end(function(response) {
      var rawBudgets = response.body.budgets;

      var budgets = {
        budgets: rawBudgets.map(function(b) { return models.Budget.build(b); })
      };

      console.log(budgets);

      this.setState(this.merge(this.getState(), response.body));
    }.bind(this));
  },

  onGet: function(data) {
    request.get('/budgets/' + data.budgetId)
    .set('Accept', 'application/json')
    .end(function(response) {
      if (response.body.budget) {
        var stateDelta = {budgets: response.body.budget};
        this.setState(this.merge(this.getState(), stateDelta));
      }
    }.bind(this));
  },

  onUpdate: function(data) {},

  onDestroy: function(data) {}
});
