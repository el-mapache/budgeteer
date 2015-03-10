var React = require('react');
var AddBudgetButton = require('./add-budget-button.js');
var BudgetActions = require('../../actions/budget-actions.js');
var BudgetListItem = require('./budget-list-item.js');

var BudgetList = React.createClass({
  componentWillMount: function() {
    // TODO move this to fetching/rendering on the server, eventually
    BudgetActions.getAll();
  },

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
              {this.props.budgets.map(function(budget) {
                return (<BudgetListItem key={budget.id} budget={budget}/>);
              })}
            </tbody>
          </table>
        </section>
      </div>
    )
  }
});

module.exports = BudgetList;
