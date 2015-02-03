var Dispatcher = require('../dispatcher/app-dispatcher.js');

function _generateAction(actionClass, action) {
  Object.defineProperty(actionClass, action, {
    value: function(data) {
      var payload = {
        type: action,
        data: data
      };

      Dispatcher.dispatch(payload);
    }
  });
}

class ActionCreator {
  generateActions(...actions) {
    actions.forEach((action) => {
      _generateAction(this, action);
    });
  }
}

module.exports = ActionCreator;