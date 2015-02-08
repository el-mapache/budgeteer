var React = require('react');
var Button = require('../generic/button.js');
var TextInput = require('../generic/text-input.js');
var BudgetDatePicker = require('./budget-date-picker.js');

var NewBudget = React.createClass({
  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className="row">
        <div className="col s6">
          <div className="row">
            <TextInput labelText="Budget Title" name="budget-title" defaultValue="" ref="title" />
            <TextInput labelText="How much do you want to spend?" name="budget-total" defaultValue="" ref="total"/>
            <BudgetDatePicker labelText="Budget Start" ref="startDate" className="col s6" />
            <BudgetDatePicker labelText="Budget End" ref="endDate" className="col s6" />
          </div>
          <Button buttonType="submit" text="Create Budget"/>
        </div>
      </form>
    );
  },

  handleSubmit: function(event) {
    event.preventDefault();
    console.log('Im submitting!', arguments)
    //do ajax stuff
  }
});

module.exports = NewBudget;
