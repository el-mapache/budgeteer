var Store = require('./store.js')();
var UserActions = require('../actions/user-actions.js');
var BudgetActions = require('../actions/budget-actions.js');
var request = require('superagent');
var models = require('../models/models.js');
var csrf = require('../mixins/csrf-util.js');

var currentBudgetId = null;

var BudgetStore =  Store.create({
  getInitialState: function() {
    return {
      budgets: {}
    };
  },

  init: function() {
    this.bindToActions(BudgetActions);
    this.bindToActions(UserActions, {
      'getSuccess': '_mergeUsers'
    }, true);
  },

  getBudget: function(id) {
    var budget = this.budgets()[id];

    if (budget) {
      currentBudgetId = id;
      return budget;
    }

    return models.Budget.build();
  },

  budgets: function() {
    return this.getState().budgets;
  },

  _mergeUsers: function(user) {
    var currentBudget = this.getBudget(currentBudgetId);

    if (~Object.keys(currentBudget.users).indexOf(user.id)) {
      return;
    }

    currentBudget.users.push(user);

    this.setState(this.getState());
  },

  onCreate: function(data) {
    request.post('/budgets')
    .set('Accept', 'application/json')
    .set('X-CSRF-Token', csrf.getToken())
    .send({ budget: data })
    .end(function(response) {
      if (response.error) {
        console.log('Error creating budget.');
        return;
      }

      return this.setState(this.merge(this.getState(), response.body));
    }.bind(this));
  },

  getAll: function(done) {
    var cache = this.budgets();

    if (cache.length) {
      return cache;
    }

    request.get('/budgets')
    .set('Accept', 'application/json')
    .end(this._handleGetAll.bind(this, done));
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

  onDestroy: function(data) {},

  _handleGetAll: function(done, response) {
    if (response.error) {
      console.log('Error fetching budgets.');
      return;
    }

    var budgets = response.body.budgets;

    // get the budgets currently cached by the store.
    var existingBudgets = this.budgets();

    // create a new data structure of budget models keyed to their ids.
    var newBudgets = budgets.reduce(function(memo, budget) {
      memo[budget.id] = models.Budget.build(budget);
      return memo;
    }, {});

    this.setState({
      budgets: this.merge(existingBudgets, newBudgets)
    });

    done();
  }
});

module.exports = BudgetStore;