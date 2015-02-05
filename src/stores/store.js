var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/app-dispatcher.js');

const CHANGE_EVENT = 'change';
var _STATE = null;

/**
  * Default store implementation that other stores can inherit from.
  * Contains default actions that all stores need to implement. Stores register listeners
  * from the views which fire whenever a store's data is changed.
  *
  * All actions that a store is expected to respond to should be written in the format of
  * `on${Action}`.
**/


class Store extends EventEmitter {
  constructor() {
    this.CALLBACKS = {};

    this.dispatchToken = AppDispatcher.register((payload) => {
      let [ actionClass, handler ] = payload.actionType.split('_');

      // This store hasn't been bound to the action class.
      if (!actionClass in this.CALLBACKS) {
        return;
      }

      // Do we have a mapping to a valid method name on this store?
      let callback = this.CALLBACKS[actionClass][handler];

      if (callback) {
        this[callback](payload.data);
        this.emitChange();
      }
    });
  }

  // Create a dictionary with mappings from an action (i.e. 'create'), 
  // to methods names on this class (i.e. 'onCreate').
  bindToActions(actionClass) {
    this.CALLBACKS[actionClass.name] = {};

    actionClass.ACTIONS.forEach((action) => {
      var derivedHandler = _deriveHandler(action);

      if (this[derivedHandler] && typeof this[derivedHandler] === 'function') {
        // Map the store's callback to the action type.
        this.CALLBACKS[actionClass.name][action] = derivedHandler;
      }
    });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  listenTo(callback, ctx) {
    this.on(CHANGE_EVENT, callback.bind(ctx, this.getState()));
  }

  stopListeningTo(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getState() {
    return _STATE;
  }

  setState(newState) {
    _STATE = newState;
  }
}

/** @private **/

// Take a raw action, uppercase it, and stick an 'on' in front of it.
// For example, 'destroy' becomes 'onDestroy'.
function _deriveHandler(action) {
  return `on${action.charAt(0).toUpperCase()}${action.slice(1)}`;
}

module.exports = Store;
