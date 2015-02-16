var AppDispatcher = require('../dispatcher/app-dispatcher.js');

/**
  * Generic action creator class.
  * registers an action function mapped to a string key for each action
  * the class is expected to respond to.
  *
  * Example:
  *
  * let actions = new ActionCreator();
  * actions.generateActions('create', 'destroy');
  *
  * 'actions' will now respond to actions.create() and actions.destroy() and
  * pass the payload along to the Dispatcher.
**/
class ActionCreator {
  constructor() {
    // Derive the name of the ActionCreator from it's constructor.
    // TODO ugly ugly workaround as I am transitioning away from es6...not ready for prime time.
    var constructorString;
    // es6 allows you to define the constructor directly, not just a function that is constructed with
    // js' default object constructor.
    var maybeES6Func = this.constructor.toString();
    // if it has `native code` its the vanilla object constructor.
    var hasVanillaConstructor = /\[native code\]/.test(maybeES6Func);

    constructorString = hasVanillaConstructor ? this.prototype.constructor : maybeES6Func;

    this.name = constructorString.split(' ')[1].match(/\w+/).shift();

    if (!this.name) {
      throw new Error('An Action class must set a constructor function on its prototype or define one directly(ES6).');
    }
  }

  // Accepts a variable number of strings representing the names of the actions this
  // class is expected to respond to.
  generateActions(...actions) {
    actions = actions[0] instanceof Array ? actions.shift() : actions;
    this.ACTIONS = actions;

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
      actionType: `${this.name}_${action}`,
      data: data
    };

    AppDispatcher.dispatch(payload);
  }
}

module.exports = ActionCreator;
