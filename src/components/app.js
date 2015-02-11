var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;


var Header = require('./header.js');
var BudgetPane = require('./budgets/budget-pane.js');
var SignupPane = require('./signup-pane.js');

/**
  *- bootstrap store on page load in router?
  *- have api send data on page load and set it in a script that I can
  *  read from?  this idea is probably better.
**/


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
    <Route name="budgets" handler={BudgetPane} />
    <Route name="signup" handler={SignupPane} />
    <DefaultRoute handler={BudgetPane}/>
  </Route>
);

//<DefaultRoute handler={BudgetPane}/>
Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.getElementById('budgeteer'));
});

