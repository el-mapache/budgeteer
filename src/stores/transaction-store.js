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

  onCreate: function(data) {
    request.post('/budgets/' + data.BudgetId + '/transactions/create')
    .set('Accept', 'application/json')
    .send({ data: data })
    .end((response) => {
      if (response.body.errors) {
        //handle errors
      }

      this.merge(response.body, { transactions: this.mergeTransactions(response.body.transaction) });
      this.setState(this.merge(this.getState(), response.body));
    });
  },

  // add any returned transactions to the existing cache of transactions
  mergeTransactions: function(transaction) {
    // copy the existing transactions list
    var transactions = this.getState().transactions.slice();
    transactions.push(transaction)
    return transactions;
  }
});
