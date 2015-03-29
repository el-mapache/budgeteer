var React = require('react');
var FormUtils = require('../../mixins/form-utils.js');
var Button           = require('../generic/button.js');
var TextInput        = require('../generic/text-input.js');
var BudgetDatePicker = require('../budgets/budget-date-picker.js');
var Select = require('../generic/select.js');
var categories = require('../../category.js');
var TransactionActions = require('../../actions/transaction-actions.js');
var Router = require('react-router');
var DateFormatter = require('../../mixins/date-formatter.js');

var NewTransaction = React.createClass({
  mixins: [FormUtils, Router.State, DateFormatter],

  getInitialState: function() {
    return {
      amount: '',
      purchased_on: this.momentToValue(this.getMoment()),
      percentage_to_split: 50,
      description: '',
      title: '',
      category: ''
    };
  },

  render: function() {
    return (
      <form className="row" onSubmit={this.onSubmitHandler}>
        <div className="col s8 offset-m1">
          <div className="row">
            <TextInput labelText="Amount Spent" name="amount" value={this.state.amount} onChange={this.handleInputUpdate} />
            <Select optionsForSelect={this.categoriesToOptions()} handleSelect={this.handleSelect} value={this.state.category} />
            <TextInput labelText="Split Amount" onChange={this.handleInputUpdate} name="percentage_to_split" value={this.state.percentage_to_split} />
            <TextInput labelText="Title" onChange={this.handleInputUpdate} name="title" value={this.state.title} />
            <TextInput labelText="Note" onChange={this.handleInputUpdate} name="note" value={this.state.note} />
            <BudgetDatePicker labelText="Purchased On" className="col s6" onDayClick={this.setDay.bind(this, 'purchasedOn')} value={this.state.purchased_on} />
          </div>
          <Button buttonType="submit" text="Add Transaction"/>
        </div>
      </form>
    );
  },

  handleSelect: function(evt) {
    this.setState({
      category: evt.target.value
    });
  },

  onSubmitHandler: function(event) {
    event.preventDefault();

    TransactionActions.create({
      transaction: this.state,
      budget_id: this.getParams().budgetId
    });
  },

  categoriesToOptions: function() {
    return categories.map(function(category) {
      return {
        'text': category,
        'value': category
      };
    });
  }
});

module.exports = NewTransaction;
