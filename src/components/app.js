var React = require('react');
var Header = require('./header.js');
var BudgetPane = require('./budgets/budget-pane.js');

/**
  *- bootstrap store on page load in router?
  *- have api send data on page load and set it in a script that I can
  *  read from?  this idea is probably better.
**/


var App = React.createClass({
	render: function() {
		return (
      <div>
        <Header />
        <div className="container">
          <BudgetPane />
        </div>
      </div>
    );
	}
});

React.render(<App />, document.getElementById('app'));
