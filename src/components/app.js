var React = require('react');
var Header = require('./header.js');
var BudgetPane = require('./budgets/budget-pane.js');


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
