var React            = require('react');
var Button           = require('../generic/button.js');
var TextInput        = require('../generic/text-input.js');
var BudgetDatePicker = require('./budget-date-picker.js');
var BudgetActions = require('../../actions/budget-actions.js');
var DateFormatter = require('../../mixins/date-formatter.js');
var _                = require('underscore');
var Link = require('react-router').Link;

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

  setDay: function(field, day, modifiers, event) {
    var nextState = {};
    nextState[field] = this.momentToValue(day);
    this.setState(nextState);
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
              <BudgetDatePicker labelText="Budget Start" ref="startDate" className="col s6" onDayClick={this.setDay.bind(this, 'startDate')} value={this.state.startDate} />
              <BudgetDatePicker labelText="Budget End" ref="endDate" className="col s6" onDayClick={this.setDay.bind(this, "endDate")} value={this.state.endDate} />
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
  },

  // respond to user input in the text fields and update the form's state.
  handleInputUpdate: function(evt) {
    var nextState = {};
    nextState[evt.target.name] = evt.target.value;
    this.setState(nextState);
  }
});

module.exports = NewBudget;
