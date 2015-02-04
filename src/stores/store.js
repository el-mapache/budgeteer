var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../actions/app-dispatcher.js');

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
    this.dispatchToken = dispatcher.register((payload) =>
      var { target, action } = payload.action.split('_');

      var callback = `on${action.charAt(0).toUpperCase()}${action.slice(1)}`;

      // This store doesnt implement the triggered Actions.
      if (this.name !== target) {
        return;
      }

      if (this[callback] && this[callback] instanceof 'function') {
        var result = this[callback](payload.data);

        result && this.emitChange();
      }
    );
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

module.export = Store;
