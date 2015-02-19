// Mixin designed to hold common form manipulation methods.
module.exports = {
  setDay: function(field, day, modifiers, event) {
    var nextState = {};
    nextState[field] = day.format('DD-MM-YYYY');
    this.setState(nextState);
  },

  // respond to user input in the text fields and update the form's state.
  handleInputUpdate: function(evt) {
    var nextState = {};
    nextState[evt.target.name] = evt.target.value;
    this.setState(nextState);
  }
};
