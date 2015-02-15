var React =           require('react');
var RouteHandler = require('react-router').RouteHandler;
var BudgetStore =     require('../../stores/budget-store.js');
var StoreConsumer =   require('../../mixins/store-consumer.js');
var BudgetActions = require('../../actions/budget-actions.js');


var BudgetPane = React.createClass({
  mixins: [StoreConsumer.fromStore(BudgetStore)],

  render: function() {
    return (
      <div className="row pane">
        <RouteHandler {...this.state}/>
      </div>
    );
  }
});

module.exports = BudgetPane;
