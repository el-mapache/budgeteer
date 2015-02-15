var React = require('react');
var Link = require('react-router').Link;
var Button = require('../generic/button.js');
var Icon = require('../generic/icon.js');

function icon() {
  return <Icon iconType="mdi-content-add-circle-outline"/>;
}

var AddBudgetButton = React.createClass({
  render: function() {
    return (
      <Link to="/budgets/new">
        <i className="mdi-content-add-circle-outline left"></i>
        <button type="button" className="btn light-blue darken-3">Start a budget</button>
      </Link>
    );
  }
});

module.exports = AddBudgetButton;
