var React = require('react');
var moment = require('moment');
var DatePicker = require('react-day-picker');

function valueToDate(s) {
  var date = moment(s, 'DD-MM-YYYY', true);
  return date.isValid() ? date : null;
}

function dateToValue(d) {
  return d.format('DD-MM-YYYY');
}

function isToday(dateA, dateB) {
  return dateA.startOf('day').isSame(dateB.startOf('day'));
}

var BudgetDatePicker = React.createClass({
  getInitialState() {
    return {value: dateToValue(moment())};
  },

  getModifiers() {
    var modifiers = {
      today(day) {
        return isToday(moment(), day);
      },

      disabled(day) {
        return day.diff(moment(), 'day') < 0;
      },

      selected: function(day) {
        let value = valueToDate(this.state.value);
        if (modifiers.disabled(day) || !value) {
          return false;
        } else {
          return isToday(value, day);
        }
      }.bind(this)
    };

    return modifiers;
  },

  render() {
    return (
      <div className={this.props.className}>
        <label style={{marginBottom: '20px', display: 'inline-block'}}>{this.props.labelText}</label>
        <DatePicker enableOutsideDays={true} initialMonth={ valueToDate(this.state.value) || moment() } modifiers={this.getModifiers()} />
      </div>
    );
  }
});

module.exports = BudgetDatePicker;
