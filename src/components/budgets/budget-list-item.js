var React = require('react');
var DateFormatter = require('../../mixins/date-formatter.js');
var Link = require('react-router').Link;
var _ = require('underscore');
var UserStore = require('../../stores/user-store.js');

var BudgetListItem = React.createClass({
  mixins: [DateFormatter],

  getInitialState: function() {
    return {
      budget: this.props.budget,
      owner: UserStore.get(this.props.budget.user_id)
    };
  },

  render: function() {
    var budget = this.props.budget;

    return (
      <tr key={budget.id}>
        <td className="collection-item">{budget.title}</td>
        <td className="collection-item">{budget.total}</td>
        <td className="collection-item">{this.humanize(budget.startDate)} - {this.humanize(budget.endDate)} ({this.difference(budget.endDate, budget.startDate)})</td>
        <td className="collection-item">{this.humanize(budget.createdAt)}</td>
        <td className="collection-item">{budget.user.first_name}</td>
        <td>
          <Link to="budget" params={{budgetId: budget.id}}>
            <i className="mdi-content-forward"></i>
          </Link>
        </td>
      </tr>
    )
  },

  budgetOwner: function() {
    _.findWhere(this.props.budget.users, {id: this.props.budget.user_id});
  }
});

module.exports = BudgetListItem;
