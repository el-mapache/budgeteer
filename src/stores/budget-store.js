var Store = require('./store.js');
var BudgetActions = require('../actions/budget-actions.js');
var request = require('superagent');

class BudgetStore extends Store {
  constructor() {
    super();
    this.bindToActions(BudgetActions);
  }

  getInitialState() {
    return {
      budgets: [],
      errors: [],
      editing: false,
      creating: true,
      message: ''
    };
  }

  onCreate(data) {
    request.
    post('/budgets/create').
    send({
      data: data
    }).
    end((response) => {
      var stateDelta = this.merge(response.body, {creating: false});
      this.setState(this.merge(this.getState(), stateDelta));
    });
  }

  onUpdate(data) {

  }

  onDestroy(data) {

  }

  onNew() {
    let previousState = this.getState();
    let newState = {
      creating: true
    };

    this.setState(this.merge(previousState, newState));
  }
}

module.exports = new BudgetStore();
