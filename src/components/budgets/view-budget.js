var React = require('react');
var BudgetActions = require('../../actions/budget-actions.js');
var BudgetStore = require('../../stores/budget-store.js');

var ViewBudget = React.createClass({
  componentWillMount: function() {
    BudgetActions.get();
  },

  render: function() {
    return (
      <div></div>
    );
  }
});

module.exports = ViewBudget;
