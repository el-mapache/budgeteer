var React = require('react');
var FormUtils = require('../../mixins/form-utils.js');
var TextInput = require('../generic/text-input.js');
var Button = require('../generic/button.js');
var BudgetUsersActions = require('../../actions/budget-users-actions.js');

var AddBudgetUserForm = React.createClass({
  mixins: [FormUtils],

  propTypes: {
    budgetId: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      email: ''
    }
  },

  render: function() {
    return(
      <div className="row">
        <div className="col s6">
          <h5>Add another user to this budget</h5>
          <p><small>if the user's email is in our system, we'll add them to your budget</small></p>
          <TextInput labelText="User's email" autoComplete="off" name="email" value={this.state.email} type="email" onChange={this.handleInputUpdate}/>
          <Button onClick={this.onAddUser} text="Add user"/>
        </div>
      </div>
    );
  },

  onAddUser: function() {
    var payload = {
      budgetId: this.props.budgetId,
      email: this.state.email
    };

    BudgetUsersActions.create(payload);
  }
});

module.exports = AddBudgetUserForm;
