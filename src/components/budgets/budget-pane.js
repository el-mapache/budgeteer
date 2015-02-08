var React =           require('react');
var AddBudgetButton = require('./add-budget-button.js');
var NewBudget =       require('./new-budget.js');
var BudgetList =      require('./budget-list.js');
var BudgetStore =     require('../../stores/budget-store.js');
var StoreConsumer =   require('../../mixins/store-consumer.js');


var BudgetPane = React.createClass({
  mixins: [StoreConsumer.fromStore(BudgetStore)],

  shouldComponentUpdate: function(nextProps, nextState) {
    console.log(arguments);
    return true;
  },

  render: function() {
    return (
      <div className="row pane">
        <section>
          <AddBudgetButton />
          <NewBudget />
        </section>
        <BudgetList />
      </div>
    );
  }
});

module.exports = BudgetPane;
