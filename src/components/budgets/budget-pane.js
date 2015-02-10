var React =           require('react');
var AddBudgetButton = require('./add-budget-button.js');
var NewBudget =       require('./new-budget.js');
var BudgetList =      require('./budget-list.js');
var BudgetStore =     require('../../stores/budget-store.js');
var StoreConsumer =   require('../../mixins/store-consumer.js');
var BudgetActions = require('../../actions/budget-actions.js');


var BudgetPane = React.createClass({
  mixins: [StoreConsumer.fromStore(BudgetStore)],

  shouldComponentUpdate: function(nextProps, nextState) {
    console.log('updating', arguments);
    return true;
  },

  componentDidMount: function() {},

  render: function() {
    return (
      <div className="row pane">
        <section className="col s12">
          <AddBudgetButton />
          <NewBudget key={this.state.creating} />
        </section>
        <BudgetList />
      </div>
    );
  }
});

module.exports = BudgetPane;
