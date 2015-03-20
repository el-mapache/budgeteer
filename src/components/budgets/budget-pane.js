var React         = require('react');
var RouteHandler  = require('react-router').RouteHandler;
var BudgetStore   = require('../../stores/budget-store.js');
var UserStore     = require('../../stores/user-store.js');
var StoreConsumer = require('../../mixins/store-consumer.js');

var BudgetPane = React.createClass({
  mixins: [StoreConsumer.fromStore(BudgetStore)],

  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      BudgetStore.getAll(callback);
    }
  },

  getInitialState: function() {
    return {
      budgets: BudgetStore.getState(),
      users: UserStore.getState()
    };
  },

  render: function() {
    return (
      <div className="row pane">
        <RouteHandler {...this.state}/>
      </div>
    );
  }
});

module.exports = BudgetPane;
