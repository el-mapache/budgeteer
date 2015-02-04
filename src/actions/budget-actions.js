var ActionCreator = require('./action-creator.js');

class BudgetActions extends ActionCreator {
  constructor() {
    super();
    this.generateActions('create', 'update', 'destroy');
  }
}

module.exports = BudgetActions;
