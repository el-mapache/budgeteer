var Dispatcher = require('../dispatcher/app-dispatcher.js');


class ActionCreator {
  constructor() {
    // Derive the name of the ActionCreator from it's constructor.
    this.name = this.constructor.toString().split(' ')[1].match(/\w+/).shift();
  }

  generateActions(...actions) {
    actions.forEach((action) => {
      _generateAction(this, action);
    });
  }
}

/** @private **/

function _generateAction(actionClass, action) {
  // Let the consumer know the action has been defined twice.
  if (actionClass[action]) {
    console.warn(`Action already has an action defined called ${action}.
                  The previous method will be overwritten.`);
  }

  // create a function we can send to the dispatcher with the payload and action name.
  actionClass[action] = function(data) {
    var payload = {
      type: `${this.name}_${action}`,
      data: data
    };

    Dispatcher.dispatch(payload);
  }
}

module.exports = ActionCreator;
