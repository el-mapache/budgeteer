var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/app-dispatcher.js');

const CHANGE_EVENT = 'change';

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
    this.CALLBACKS = [];

    this.dispatchToken = dispatcher.register((payload) => {
      // var {a: a, b: b} = {a:1, b:2}
      let [ target, action ] = payload.action.split('_');

      var callback = deriveCallbackName(action);

      // This store doesnt implement the triggered Actions.
      if (!target in this.CALLBACKS) {
        return;
      }

      if (this.CALLBACKS[target][action] instanceof 'function') {
        var result = this[callback](payload.data);

        result && this.emitChange();
      }
    });
  }

  bindToActions(...actionClasses) {
    actionClasses.forEach((actionClass) => {
      this.CALLBACKS[actionClass.name] = {};

      actionClass.ACTIONS.forEach((action) => {
        var derivedCallback = _deriveCallbackName(action);

        if (derivedCallback) {
          derivedCallback = derivedCallback.bind(this);
        }

        this.CALLBACKS[actionClass.name][action] = this[derivedCallback];

      });
    });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  listenTo(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  stopListeningTo(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

function _deriveCallbackName(action) {
  return `on${action.charAt(0).toUpperCase()}${action.slice(1)}`;
}

module.export = Store;
