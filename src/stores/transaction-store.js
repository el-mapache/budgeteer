var Store = require('./store.js')();
var TransactionActions = require('../actions/transaction-actions.js');
var BudgetStore = require('./budget-store.js');
// TODO request should live in a separate module mixed in to the base store object
var request = require('superagent');
var csrf = require('../mixins/csrf-util.js');
var _ = require('underscore');

//TODO add has one property or something so i can nest models and do auto url generation.

var currentTransactionId = null;
var currentBudgetId = null;

module.exports = Store.create({
  init: function() {
    this.bindToActions(TransactionActions);
    //BudgetStore.listenTo(this._mergeTransactions, this);
  },

  getInitialState: function() {
    return {
      transactions: []
    };
  },

  transactions: function() {
    return this.getState().transactions;
  },

  // TODO not sure how to handle gets with the automatic state updates
  getAll: function(budgetId) {
    var transactions = this.getState().transactions;

    if (transactions.length) {
      // Cache hit, return cached transactions.
      return transactions;
    }

    request.get('/budgets/' + budgetId + '/transactions')
    .set('Accept', 'application/json')
    .end(function(res) {
      if (res.ok) {
        this.setState({transactions: res.body.transactions});
      }
    }.bind(this));
  },

  onCreate: function(data) {
    request.post('/budgets/' + data.budget_id + '/transactions')
    .set('Accept', 'application/json')
    .set('X-CSRF-Token', csrf.getToken())
    .send(data)
    .end(function(response) {
      if (response.body.errors) {
        console.log('Error creating transaction.');
        return;
      }

      var newTransaction = response.body.transaction;

      this.setState({
        transactions: this._mergeTransaction(newTransaction)
      });
    }.bind(this));
  },

  // add any returned transactions to the existing cache of transactions
  _mergeTransaction: function(transaction) {
    // copy the existing transactions list
    var transactions = this.transactions().slice();
    transactions.push(transaction)
    return transactions;
  },

  _mergeTransactions: function(state) {
    console.log(state)
    if (!state && !state.transactions.length) {
      return;
    }

    var transactions = state.transactions;

    this.setState({
      transactions: _.uniq(transactions.concat(this.transactions()))
    });

    console.log(this.getState());
  }
});
