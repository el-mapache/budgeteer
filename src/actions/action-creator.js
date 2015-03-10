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

var ActionCreatorFactory = function() {
  var cache = {};

  function _generateAction(actionClass, action) {
    // Let the consumer know the action has been defined twice.
    if (actionClass[action]) {
      console.warn('Action already has an action defined called ' + action + '. The previous method will be overwritten.');
    }

    // create a function we can send to the dispatcher with the payload and action name.
    actionClass[action] = function(data) {
      var payload = {
        actionType: this.name + '_' + action,
        data: data
      };

      AppDispatcher.dispatch(payload);
    }
  }

  function ActionCreator(name, actions) {
    this.name = name;
    this.ACTIONS = [];
    this.handlers = {};
  }

  ActionCreator.prototype.generateActions = function(actionNames) {
    this.ACTIONS = actionNames;

    actionNames.forEach(function(action) {
      _generateAction(this, action);
    }.bind(this));
  };

  ActionCreator.prototype.constructor = ActionCreator;

  return {
    create: function(name /** ...actions **/) {
      if (!cache[name]) {
        var actionCreator = new ActionCreator(name);

        actionCreator.generateActions.call(actionCreator, [].slice.call(arguments, 1));
        cache[name] = actionCreator
      }

      return cache[name];
    }
  };
};

module.exports = new ActionCreatorFactory();
