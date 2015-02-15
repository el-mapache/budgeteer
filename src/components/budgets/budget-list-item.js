var React = require('react');
var DateFormatter = require('../../mixins/date-formatter.js');

var BudgetListItem = React.createClass({
  mixins: [DateFormatter],

  render: function() {
    var budget = this.props.budget
    return (
      <tr key={budget.id}>
        <td className="collection-item">{budget.title}</td>
        <td className="collection-item">{budget.total}</td>
        <td className="collection-item">{this.humanize(budget.startDate)} - {this.humanize(budget.endDate)} ({this.difference(budget.startDate, budget.endDate)})</td>
        <td className="collection-item">{this.humanize(budget.createdAt)}</td>
        <td><a href={"budgets/" + budget.id}><i className="mdi-content-forward"></i></a></td>
      </tr>
    )
  }
});

module.exports = BudgetListItem;
