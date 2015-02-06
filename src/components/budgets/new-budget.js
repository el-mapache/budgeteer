var React = require('react');
var BudgetActions = require('../../actions/budget-actions.js');

var NewBudget = React.createClass({
  componentWillMount: function() {},

  newBudgetHandler: function() {
    BudgetActions.new();
  },

  render: function() {
    return (
      <button type="button" onClick={this.newBudgetHandler} className="btn light-blue darken-3">
        <i className="medium mdi-content-add-circle-outline left"></i>
        Start a budget
      </button>

      // <h1>new budget please</h1>
    );
  }
});

module.exports = NewBudget;
