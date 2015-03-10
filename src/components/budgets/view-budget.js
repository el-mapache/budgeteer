var React = require('react');
var BudgetActions = require('../../actions/budget-actions.js');
var Router = require('react-router');
var NewTransaction = require('../transactions/new-transaction.js');
var TransactionList = require('../transactions/transaction-list.js');
var Link = Router.Link;
var AddBudgetUserForm = require('./add-budget-user.js');
var BudgetStore = require('../../stores/budget-store.js');

var ViewBudget = React.createClass({
  mixins: [Router.State],

  getInitialState: function() {
    return {
      budget: budgetStore.getCurrent(this.getParams().budgetId)
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
    var budget = this.state.budget;
    var transactionsByUser = this.amountsByUser(budget.Transactions);

    var nodes = [];

    for (var user in transactionsByUser) {
      var currentUser = transactionsByUser[user];
      nodes.push(<span>{user} has spent {parseFloat(currentUser.hasSpent).toFixed(2)} and is owed {parseFloat(currentUser.isOwed).toFixed(2)}</span>);
    }

    var users = budget.Users.map(function(user) {
      return user.firstName;
    });

    return (
      <div>
        <Link to="budgets">Back to Budgets</Link>
        <h1>{budget.title}</h1>
        <div className="row">
          <div className="col s12">
            <p className="col s3 center-align">{users}</p>
            <p className="col s3 center-align">Budget Total: ${budget.total}</p>
            <p className="col s3 center-align">So far, you have spent ${this.totalSpent(budget.Transactions)} of your budget.</p>
            <p className="col s3 center-align">
              {nodes}
            </p>
          </div>
        </div>
        <AddBudgetUserForm budgetId={this.getParams().budgetId} />
        <TransactionList />
        <NewTransaction />
      </div>
    );
  },

  totalSpent: function(transactions) {
    transactions = transactions || [];
    return parseFloat(transactions.reduce(function(memo, item) {
      return memo += parseInt(item.amount, 10);
    }, 0)).toFixed(2);
  },

  amountsByUser: function(transactions) {
    if (!transactions) {
      return;
    }

    return transactions.reduce(function(memo, t) {
      var user = t.User.firstName;
      if (!memo[user]) {
        memo[user] = {
          transactions: [],
          hasSpent: 0,
          isOwed: 0
        };
      }

      var amount = parseFloat(t.amount);
      var percent = t.percentageToSplit / 100;

      memo[user].hasSpent += amount;
      memo[user].isOwed += (amount * percent);
      memo[user].transactions.push(t);

      return memo;
    },{});
  }
});

module.exports = ViewBudget;
