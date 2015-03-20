var React            = require('react');
var Button           = require('../generic/button.js');
var TextInput        = require('../generic/text-input.js');
var BudgetDatePicker = require('./budget-date-picker.js');
var BudgetActions = require('../../actions/budget-actions.js');
var FormUtils = require('../../mixins/form-utils.js');
var Link = require('react-router').Link;
var DateFormatter = require('../../mixins/date-formatter.js');

var NewBudget = React.createClass({
  mixins: [FormUtils, DateFormatter],

  getInitialState: function() {
    return {
      title: '',
      total: '',
      start_date: this.momentToValue(this.getMoment()),
      end_date: this.momentToValue(this.getMoment())
    };
  },

  render: function() {
    return (
      <div>
        <Link to="budgets">Back to Budgets</Link>
        <form onSubmit={this.handleSubmit} className="row">
          <div className="col s8 offset-m1">
            <div className="row">
              <TextInput labelText="Budget Title" name="title" value={this.state.title} onChange={this.handleInputUpdate} />
              <TextInput labelText="How much do you want to spend?" onChange={this.handleInputUpdate} name="total" value={this.state.total} />
              <BudgetDatePicker labelText="Budget Start" ref="startDate" className="col s6" onDayClick={this.setDay.bind(this, 'start_date')} value={this.state.start_date} />
              <BudgetDatePicker labelText="Budget End" ref="endDate" className="col s6" onDayClick={this.setDay.bind(this, "end_date")} value={this.state.end_date} />
            </div>
            <Button buttonType="submit" text="Create Budget"/>
          </div>
        </form>
      </div>
    );
  },

  // call action creator
  handleSubmit: function(event) {
    event.preventDefault();

    BudgetActions.create(this.state);
    this.setState(this.getInitialState());
  }
});

module.exports = NewBudget;
