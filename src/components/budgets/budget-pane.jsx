var React =      require('react');
var NewBudget =  require('./new-budget.jsx');
var BudgetList = require('./budget-list.jsx');
var BudgetStore = require('../../stores/budget-store.js');

class BudgetPane extends React.createClass({
  getInitialState() {

  },

  componentWillMount() {
    BudgetStore.listenTo(this.setState, this);
  }

  componentWillUnmount() {
    BudgetStore.stopListeningTo(this.setState);
  }

  setState(data) {
    //do things with data
  }

  render() {
    return (
      <div className='pane'>
        <section>
          <NewBudget/>
        </section>
        <section>
          <BudgetList/>
        </section>
      </div>
    );
  }
});

module.exports = BudgetPane;
