var moment = require('moment');

function normalize(date) {
  return date.replace(/[^\d]+/g, ' ');
}

var dateFormatter = {
  getMoment: function() {
    return moment();
  },

  humanize: function(dateString) {
    return moment(dateString).format("MMMM Do");
  },

  difference: function(from, to) {
    return moment(from).diff(to, 'days') + ' days';
  },

  valueToMoment: function(dateString) {
    var date = moment(dateString, 'DD-MM-YYYY', true);

    return date.isValid() ? date : null;
  },

  /**
    * @param{date} moment:instance of moment object.
    * @return string:date string.
  **/
  momentToValue: function(date) {
    return date.format('DD-MM-YYYY');
  },

  /**
    * @param{dateA} moment:instance of moment object.
    * @param{dateB} moment:instance of moment object.
    * @return boolean.
  **/
  isToday: function(dateA, dateB) {
    return dateA.startOf('day').isSame(dateB.startOf('day'));
  },

  isBeforeToday: function(day) {
    day = typeof day === 'string' ? moment(day) : day;

    return day.diff(moment(), 'day') < 0;
  },

  isBeforeDate: function(first, second) {
    return moment(second).isBefore(moment(first))
  },

  stringToDatetime: function(dateString) {
    if (!dateString) {
      return null;
    }

    return moment(dateString.replace('-', ' '), 'DD MM YYYY').format()
  }
};

module.exports = dateFormatter;
