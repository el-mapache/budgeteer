var Store = require('./store.js');
var TransactionActions = require('../actions/transaction-actions.js');
// TODO request should live in a separate module mixed in to the base store object
var request = require('superagent');

//TODO add has one property or something so i can nest models and do auto url generation.

class TransactionStore extends Store {
  constructor() {
    super();
    this.bindToActions(TransactionActions);
  }

  onCreate(data) {
    request.post('/budgets/' + data.BudgetId + '/transactions/create')
    .set('Accept', 'application/json')
    .send({ data: data })
    .end((response) => {
      this.setState(this.merge(this.getState(), response.body));
    });
  }
}

module.exports = new TransactionStore();
