var ActionCreator = require('./action-creator.js');

class BudgetActions extends ActionCreator {
  constructor() {
    super();
    this.generateActions('new', 'create', 'update', 'destroy', 'getAll', 'get');
  }
}

module.exports = new BudgetActions();
