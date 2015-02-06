var Store = require('./store.js');
var BudgetActions = require('../actions/budget-actions.js');
var assign = require('object-assign');

class BudgetStore extends Store {
  constructor() {
    super();
    this.bindToActions(BudgetActions);
  }

  setInitialState() {
    this.setState(assign(this.getState(), {
      budgets: [],
      editing: false
    }));

    this.emitChange();
  }

  onCreate(data) {

  }

  onUpdate(data) {

  }

  onDestroy(data) {

  }

  onNew() {
    let previousState = this.getState();
    let newState = {editing: true};
    this.setState(assign(previousState, newState));
    console.log('state is now', this.getState());
  }
}

module.exports = new BudgetStore();
