var Dispatcher = require('../dispatcher/app-dispatcher.js');

function _generateAction(actionClass, action) {
  if (actionClass[action]) {
    console.warn(`Action already has an action defined called ${action}.
                  The previous method will be overwritten.`);
  }

  actionClass[action] = function(data) {
    var payload = {
      type: `${this.name}_${action}`,
      data: data
    };

    Dispatcher.dispatch(payload);
  }
}

class ActionCreator {
  constructor() {
    if (!this.name) {
      throw new Error('ActionClass must implement a name property.');
    }
  }

  generateActions(...actions) {
    actions.forEach((action) => {
      _generateAction(this, action);
    });
  }
}

module.exports = ActionCreator;
