var React = require('react');
var BudgetActions = require('../../actions/budget-actions.js');
var Router = require('react-router');
var NewTransaction = require('../transactions/new-transaction.js');
var TransactionList = require('../transactions/transaction-list.js');
var Link = Router.Link;

var ViewBudget = React.createClass({
  mixins: [Router.State],

  getInitialState: function() {
    return {
      budgetId: this.getParams().budgetId
    };
  },

  componentWillMount: function() {
    // If there are no budgets already in the props, fetch one from the server
    if (!this.props.budgets.length) {
      BudgetActions.get({
        budgetId: this.state.budgetId
      });
    }
  },

  render: function() {
    var budget = this.getCurrentBudget();

    return (
      <div>
        <Link to="budgets">Back to Budgets</Link>
        <h2>{budget.title}</h2>
        <TransactionList transactions={budget.Transactions || []} />
        <NewTransaction />
      </div>
    );
  },

  getCurrentBudget: function() {
    var self = this;
    // this feels wrong, like there is a react way to achieve loading
    // of an element from the server. Maybe a loading component?
    return this.props.budgets.filter(function(budget) {
      if (budget.id == self.state.budgetId) {
        return budget;
      }
    }).shift() || {};
  }
});

module.exports = ViewBudget;
