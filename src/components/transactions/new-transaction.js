var React = require('react');
var FormUtils = require('../../mixins/form-utils.js');
var Button           = require('../generic/button.js');
var TextInput        = require('../generic/text-input.js');
var BudgetDatePicker = require('../budgets/budget-date-picker.js');
var Select = require('../generic/select.js');
var categories = require('../../category.js');
var TransactionActions = require('../../actions/transaction-actions.js');
var Router = require('react-router');
var assign = require('object-assign');
// var TransactionStore = require('../../stores/transaction-store.js');

var NewTransaction = React.createClass({
  mixins: [FormUtils, Router.State],

  getInitialState: function() {
    return {
      cost: '',
      purchasedOn: '',
      split: '',
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
            <TextInput labelText="Amount Spent" name="cost" value={this.state.cost} onChange={this.handleInputUpdate} />
            <Select optionsForSelect={this.categoriesToOptions()} />
            <TextInput labelText="Split Amount" onChange={this.handleInputUpdate} name="split" value={this.state.split} />
            <TextInput labelText="Title" onChange={this.handleInputUpdate} name="title" value={this.state.title} />
            <TextInput labelText="Note" onChange={this.handleInputUpdate} name="note" value={this.state.note} />
            <BudgetDatePicker labelText="Purchased On" className="col s6" onDayClick={this.setDay.bind(this, 'purchasedOn')} value={this.state.purchasedOn} />
          </div>
          <Button buttonType="submit" text="Add Transaction"/>
        </div>
      </form>
    );
  },

  onSubmitHandler: function(event) {
    event.preventDefault();

    var formData = assign(this.state, {budgetId: this.getParams().budgetId});

    TransactionActions.create(formData);
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
