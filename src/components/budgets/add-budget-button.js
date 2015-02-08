var React = require('react');
var BudgetActions = require('../../actions/budget-actions.js');
var Button = require('../generic/button.js');
var Icon = require('../generic/icon.js');

function icon() {
  return <Icon iconType="mdi-content-add-circle-outline"/>;
}

var AddBudgetButton = React.createClass({
  newBudgetHandler: function() {
    BudgetActions.new();
  },

  render: function() {
    return (
      <Button icon={icon()} text="Start a budget" classes="light-blue darken-3" onClick={this.newBudgetHandler} />
    );
  }
});

module.exports = AddBudgetButton;
