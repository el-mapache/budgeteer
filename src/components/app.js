var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Header = require('./header.js');
var BudgetPane = require('./budgets/budget-pane.js');
var NewBudget = require('./budgets/new-budget.js');
var SignupPane = require('./signup-pane.js');
var BudgetList = require('./budgets/budget-list.js');
var NewTransaction = require('./transactions/new-transaction.js');
var ViewBudget = require('./budgets/view-budget.js');

var Budgeteer = React.createClass({
	render: function() {
		return (
      <div>
        <Header />
        <div className="container">
          <RouteHandler />
        </div>
      </div>
    );
	}
});

var routes = (
  <Route name="budgeteer" path="/" handler={Budgeteer}>
    <Route name="budgets" handler={BudgetPane}>
      <Route name="new" path="new" handler={NewBudget} />
      <Route name="budget" path=":budgetId" handler={ViewBudget}>
        <Route path="transactions/new" handler={NewTransaction}/>
      </Route>
      <DefaultRoute handler={BudgetList}/>
    </Route>
    <Route name="signup" handler={SignupPane} />
    <DefaultRoute handler={SignupPane}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.getElementById('budgeteer'));
});
