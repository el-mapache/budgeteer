var React = require('react');
var DateFormatter = require('../../mixins/date-formatter.js');
var DatePicker = require('react-day-picker');

var BudgetDatePicker = React.createClass({
  mixins: [DateFormatter],

  getModifiers() {
    var modifiers = {
      today: function(day) {
        return this.isToday(this.getMoment(), day);
      }.bind(this),

      disabled: function(day) {
        return this.isBeforeToday(day);
      }.bind(this),

      selected: function(day) {
        let value = this.valueToMoment(this.props.value);
        if (modifiers.disabled(day) || !value) {
          return false;
        } else {
          return this.isToday(value, day);
        }
      }.bind(this)
    };

    return modifiers;
  },

  render() {
    return (
      <div className={this.props.className}>
        <label style={{marginBottom: '20px', display: 'inline-block'}}>{this.props.labelText}</label>
        <DatePicker enableOutsideDays={true}
                    initialMonth={this.valueToMoment(this.props.value)}
                    modifiers={this.getModifiers()}
                    onDayClick={this.props.onDayClick} />
      </div>
    );
  }
});

module.exports = BudgetDatePicker;
