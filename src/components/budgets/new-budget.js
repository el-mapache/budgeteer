var React            = require('react');
var Button           = require('../generic/button.js');
var TextInput        = require('../generic/text-input.js');
var BudgetDatePicker = require('./budget-date-picker.js');
var BudgetActions = require('../../actions/budget-actions.js');
var DateFormatter = require('../../mixins/date-formatter.js');
var _                = require('underscore');

var NewBudget = React.createClass({
  mixins: [DateFormatter],
  getInitialState: function() {
    var moment = this.getMoment();
    return {
      title: '',
      total: '',
      startDate: this.momentToValue(moment),
      endDate: this.momentToValue(moment)
    };
  },

  handleClick: function(field, day, modifiers, event) {
    var nextState = {};
    nextState[field] = this.momentToValue(day);
    this.setState(nextState);
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit} className="row">
        <div className="col s8 offset-m1">
          <div className="row">
            <TextInput labelText="Budget Title" name="title" value={this.state.title} onChange={this.handleChange} />
            <TextInput labelText="How much do you want to spend?" onChange={this.handleChange} name="total" value={this.state.total} />
            <BudgetDatePicker labelText="Budget Start" ref="startDate" className="col s6" onDayClick={this.handleClick.bind(this, 'startDate')} value={this.state.startDate} />
            <BudgetDatePicker labelText="Budget End" ref="endDate" className="col s6" onDayClick={this.handleClick.bind(this, "endDate")} value={this.state.endDate} />
          </div>
          <Button buttonType="submit" text="Create Budget"/>
        </div>
      </form>
    );
  },

  getFormData: function() {
    var data = {};

    _.each(this.state, function(value, key) {
      data[key] = value;
    });

    return data;
  },

  handleSubmit: function(event) {
    event.preventDefault();

    BudgetActions.create(this.getFormData());
    this.setState(this.getInitialState());
  },

  handleChange: function(evt) {
    var nextState = {};
    nextState[evt.target.name] = evt.target.value;
    this.setState(nextState);
  }
});

module.exports = NewBudget;
