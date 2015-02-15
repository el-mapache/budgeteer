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
    request.post('/budgets/create')
    .send({ data: data })
    .end((response) => {
      var stateDelta = this.merge(response.body, {creating: false});
      this.setState(this.merge(this.getState(), stateDelta));
    });
  }

  onGetAll() {
    request.get('/budgets')
    .set('Accept', 'application/json')
    .end((response) => {
      this.setState(this.merge(this.getState(), response.body));
    });
  }

  onGet(data) {
    // Check the cache first
    request.get(data.id)
    .set('Accept', 'application/json')
    .end((response) => {

    });
  }

  onUpdate(data) {

  }

  onDestroy(data) {

  }

  onNew() {
    var previousState = this.getState();
    var newState = {
      creating: true
    };

    this.setState(this.merge(previousState, newState));
  }
}

module.exports = new BudgetStore();
