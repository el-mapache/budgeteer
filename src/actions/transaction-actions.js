var ActionCreator = require('./action-creator.js');
var assign = require('object-assign');

class TransactionActions extends ActionCreator {
  constructor() {
    super();
    this.generateActions('create');
  }
}

module.exports = new TransactionActions();
