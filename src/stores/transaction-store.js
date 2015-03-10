var Store = require('./store.js')();
var TransactionActions = require('../actions/transaction-actions.js');
// TODO request should live in a separate module mixed in to the base store object
var request = require('superagent');

//TODO add has one property or something so i can nest models and do auto url generation.

module.exports = Store.create({
  init: function() {
    this.bindToActions(TransactionActions);
  },

  getInitialState: function() {
    return {
      transactions: [],
      errors: [],
      message: ''
    };
  },

  // TODO not sure how to handle gets with the automatic state updates
  getAll: function(budgetId) {
    var transactions = this.getState().transactions;

    if (transactions.length) {
      // moving between unmounted components will make this difficult
      return;
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
    request.post('/budgets/' + data.BudgetId + '/transactions/create')
    .set('Accept', 'application/json')
    .send({ data: data })
    .end(function(response) {
      if (response.body.errors) {
        //handle errors
      }

      this.merge(response.body.transaction, {User: budgeteer.currentUser});

      this.merge(response.body, { transactions: this.mergeTransactions(response.body.transaction) });
      this.setState(this.merge(this.getState(), response.body));
    }.bind(this));
  },

  // add any returned transactions to the existing cache of transactions
  mergeTransactions: function(transaction) {
    // copy the existing transactions list
    var transactions = this.getState().transactions.slice();
    transactions.push(transaction)
    return transactions;
  }
});
