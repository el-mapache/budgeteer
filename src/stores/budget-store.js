var Store = require('./store.js');
var BudgetActions = require('../actions/budget-actions.js');

class BudgetStore extends Store {
  constructor() {
    super();
    this.bindToActions(BudgetActions);
  }

  onCreate(data) {

  }

  onUpdate(data) {

  }

  onDestroy(data) {
    
  }
}

module.exports = new BudgetStore();
