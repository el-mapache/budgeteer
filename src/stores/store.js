var EventEmitter = require('events').EventEmitter;

const CHANGE_EVENT = 'change';

class Store extends EventEmitter {
  constructor() {
    var dispatcher = {};
    // this.dispatchToken = dispatcher.register((payload) =>

    // );
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
