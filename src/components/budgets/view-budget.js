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
      budget: BudgetStore.getBudget(this.getParams().budgetId)
    };
  },

  render: function() {
    var budget = this.state.budget;
    //var transactionsByUser = this.amountsByUser(budget.Transactions);

    //var nodes = [];

    // for (var user in transactionsByUser) {
    //   var currentUser = transactionsByUser[user];
    //   nodes.push(<span>{user} has spent {parseFloat(currentUser.hasSpent).toFixed(2)} and is owed {parseFloat(currentUser.isOwed).toFixed(2)}</span>);
    // }


    var users = budget.users.map(function(user) {
      return <p>{user.first_name}</p>;
    });

    return (
      <div>
        <Link to="budgets">Back to Budgets</Link>
        <h1>{budget.title}</h1>
        <div className="row">
          <div className="col s12">
            <p className="col s3 center-align">{ users }</p>
            <p className="col s3 center-align">Budget Total: ${budget.total}</p>
            <p className="col s3 center-align">So far, you have spent $total_spent of your budget.</p>
            <p className="col s3 center-align">
              nodes
            </p>
          </div>
        </div>
        <AddBudgetUserForm budgetId={this.getParams().budgetId} />
        <TransactionList budgetId={this.getParams().budgetId} />
        <NewTransaction />
      </div>
    );
  }

  // totalSpent: function(transactions) {
  //   transactions = transactions || [];
  //   return parseFloat(transactions.reduce(function(memo, item) {
  //     return memo += parseInt(item.amount, 10);
  //   }, 0)).toFixed(2);
  // },

  // amountsByUser: function(transactions) {
  //   if (!transactions) {
  //     return;
  //   }

  //   return transactions.reduce(function(memo, t) {
  //     var user = t.User.firstName;
  //     if (!memo[user]) {
  //       memo[user] = {
  //         transactions: [],
  //         hasSpent: 0,
  //         isOwed: 0
  //       };
  //     }

  //     var amount = parseFloat(t.amount);
  //     var percent = t.percentageToSplit / 100;

  //     memo[user].hasSpent += amount;
  //     memo[user].isOwed += (amount * percent);
  //     memo[user].transactions.push(t);

  //     return memo;
  //   },{});
  // }
});

module.exports = ViewBudget;
