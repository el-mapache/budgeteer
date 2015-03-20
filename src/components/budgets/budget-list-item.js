var React = require('react');
var DateFormatter = require('../../mixins/date-formatter.js');
var Link = require('react-router').Link;
var _ = require('underscore');

var BudgetListItem = React.createClass({
  mixins: [DateFormatter],

  render: function() {
    var budget = this.props.budget;
    var owner = this.props.owner;

    return (
      <tr key={budget.id}>
        <td className="collection-item">{budget.title}</td>
        <td className="collection-item">{budget.total}</td>
        <td className="collection-item">{this.humanize(budget.startDate)} - {this.humanize(budget.endDate)} ({this.difference(budget.endDate, budget.startDate)})</td>
        <td className="collection-item">{this.humanize(budget.createdAt)}</td>
        <td className="collection-item">{owner.first_name}</td>
        <td>
          <Link to="budget" params={{budgetId: budget.id}}>
            <i className="mdi-content-forward"></i>
          </Link>
        </td>
      </tr>
    );
  }
});

module.exports = BudgetListItem;
