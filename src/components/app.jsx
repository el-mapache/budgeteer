var React = require('React');
var Header = require('./header.jsx');
var BudgetPane = require('./budgets/budget-pane.jsx');

var App = React.createClass({
	render() {
		return (
      <div id="app">
        <Header/>
        <div className="container">
          <BudgetPane/>
        </div>
      </div>
    );
	}
});

module.exports = App;
