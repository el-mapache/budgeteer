var ActionCreator = require('./action-creator.js');

class BudgetActions extends ActionCreator {
  constructor() {
    this.generateActions('create', 'update', 'destroy');
  }
}

module.exports = BudgetActions;
