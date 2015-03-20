var React = require('react');
var AddBudgetButton = require('./add-budget-button.js');
var BudgetActions = require('../../actions/budget-actions.js');
var BudgetListItem = require('./budget-list-item.js');
var _  = require('underscore');

var UserStore = require('../../stores/user-store.js');

var BudgetList = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row">
          <AddBudgetButton />
        </div>
        <section className="row">
          <table className="col s10 collection bordered hoverable responsive-table card-panel z-depth-1">
            <thead>
              <tr>
                <td className="collection-item">Title</td>
                <td className="collection-item">Total</td>
                <td className="collection-item">Dates</td>
                <td className="collection-item">Added On</td>
                <td className="collection-item">Added By</td>
              </tr>
            </thead>
            <tbody>
              { this.budgetListItems() }
            </tbody>
          </table>
        </section>
      </div>
    )
  },

  budgetListItems: function() {
    return _.map(this.props.budgets, function(budget) {
      return (<BudgetListItem key={budget.id} owner={this.getOwnerFor(budget)} budget={budget}/>);
    }.bind(this));
  },

  getOwnerFor: function(budget) {
    return UserStore.get(budget.user_id);
  }
});

module.exports = BudgetList;
