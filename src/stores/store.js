var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/app-dispatcher.js');
var assign = require('object-assign');


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
    this.merge = assign;
    this.CALLBACKS = {};

    this.dispatchToken = AppDispatcher.register((payload) => {
      let [ actionClass, handler ] = payload.actionType.split('_');

      // This store hasn't been bound to the action class.
      // TODO is this tested? NO, WRITE A TEST!!
      if (!(actionClass in this.CALLBACKS)) {
        return;
      }

      // Do we have a mapping to a valid method name on this store?
      let callback = this.CALLBACKS[actionClass][handler];

      if (callback) {
        this[callback](payload.data);
      }
    });
  }

  // this method should be overwritten by subclasses
  getInitialState() {
    return {};
  }

  setInitialState() {
    if (this.isInitialized()) {
      return;
    }

    this.setInitialized();
    this.setState(assign(this.getState(), this.getInitialState()));
  }

  // Create a dictionary with mappings from an action (i.e. 'create'),
  // to methods names on this class (i.e. 'onCreate').
  bindToActions(actionClass) {
    this.CALLBACKS[actionClass.name] = {};

    /**
      * Loop through the actions defined in the ActionCreator class
      * and set handler method when those actions are dispatched.
      * Handler will be added automatically as long as it follows the
      * naming convention 'on${Action}'. Therefore, a mapping to an
      * action called 'create' should therefore be named 'onCreate'.
    **/

    // TODO: think about how to allow stores to bind to more than one ActionCreator.
    actionClass.ACTIONS.forEach((action) => {
      var derivedHandler = _deriveHandler(action);

      if (this[derivedHandler] && isFunction(this[derivedHandler])) {
        // Map the store's callback to the action type.
        this.CALLBACKS[actionClass.name][action] = derivedHandler;
      }
    });
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
    * Bind a callback to the store that is passed a copy of the store's new state
    * after it has changed.
    * All subscribing listeners recieve a copy of the state of the store when they are
    * registered.
    *
    * @param {callback} function executed on state change
    * @param {ctx} the object context the callback will be executed in.
    * @param {onAfterBind} optional callback to receive a copy of store's initial state.
  **/

  listenTo(callback, ctx, onAfterBind) {
    if (!callback || !isFunction(callback) || !ctx) {
      throw new Error('listenTo must be passed a callback function and object context.');
    }

    this.on(CHANGE_EVENT, callback.bind(ctx, this.getState()));

    // If the store hasn't been initialized, set its initial state
    // and toggle the initialized flag.
    if (!this.isInitialized()) {
      this.setInitialState();
    }

    isFunction(onAfterBind) && onAfterBind(this.getState());
  }

  stopListeningTo(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getState() {
    return _STATE;
  }

  setState(newState) {
    _STATE = newState;
    this.emitChange();
  }

  isInitialized() {
    return _hasBeenInitialized;
  }

  setInitialized() {
    _hasBeenInitialized = true;
  }
}

/** @private **/

var _STATE = {};
var _hasBeenInitialized = false;

// Take a raw action, uppercase it, and stick an 'on' in front of it.
// For example, 'destroy' becomes 'onDestroy'.
function _deriveHandler(action) {
  return `on${action.charAt(0).toUpperCase()}${action.slice(1)}`;
}

function isFunction(fn) {
  return typeof fn === 'function';
}

module.exports = Store;
