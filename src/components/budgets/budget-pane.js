var React         = require('react');
var RouteHandler  = require('react-router').RouteHandler;
var BudgetStore   = require('../../stores/budget-store.js');
var StoreConsumer = require('../../mixins/store-consumer.js');

var BudgetPane = React.createClass({
  mixins: [StoreConsumer.fromStore(BudgetStore)],

  render: function() {
    console.log('budget pane', this.state)
    return (
      <div className="row pane">
        <RouteHandler {...this.state}/>
      </div>
    );
  }
});

module.exports = BudgetPane;
