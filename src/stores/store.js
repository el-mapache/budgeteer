var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/app-dispatcher.js');
var assign = require('object-assign');


// BLOCKER need this to stop returning a singleton class, needs to return a constructed object.
// currently causing bugs with state being overwritten

var CHANGE_EVENT = 'change';


var StoreFactory = function() {
  var _STATE = {};
  var _hasBeenInitialized = !!_hasBeenInitialized;

  // Take a raw action, uppercase it, and stick an 'on' in front of it.
  // For example, 'destroy' becomes 'onDestroy'.
  function _deriveHandler(action) {
    return 'on' + action.charAt(0).toUpperCase() + action.slice(1);
  }

  function isFunction(fn) {
    return typeof fn === 'function';
  }

  /**
    * Default store implementation that other stores can inherit from.
    * Contains default actions that all stores need to implement. Stores register listeners
    * from the views which fire whenever a store's data is changed.
    *
    * All actions that a store is expected to respond to should be written in the format of
    * `on${Action}`.
  **/
  function Store() {
    this.CALLBACKS = {};
    this.dispatchToken = AppDispatcher.register(function(payload) {
      var actionAndHandler = payload.actionType.split('_');

      var actionClass = actionAndHandler[0],
          handler = actionAndHandler[1];

      // This store hasn't been bound to the action class.
      // TODO test
      if (!(actionClass in this.CALLBACKS)) {
        return;
      }

      // Do we have a mapping to a valid method name on this store?
      var callback = this.CALLBACKS[actionClass][handler];

      if (callback) {
        this[callback](payload.data);
      }
    }.bind(this));

    this.init();
  }

  Store.prototype.merge = assign;
  Store.prototype.init = function() {};

  Store.prototype.getInitialState = function() {
    return {};
  };

  Store.prototype.setInitialState = function() {
    if (this.isInitialized()) {
      return;
    }

    this.setInitialized();
    this.setState(assign(this.getState(), this.getInitialState()));
  };

  Store.prototype.setInitialized = function() {
    _hasBeenInitialized = true;
  };

  Store.prototype.isInitialized = function() {
    return _hasBeenInitialized;
  };


  Store.prototype.getState = function() {
    return _STATE;
  };

  Store.prototype.setState = function(newState) {
    _STATE = newState;
    this.emitChange();
  };

  // Create a dictionary with mappings from an action (i.e. 'create'),
  // to methods names on this class (i.e. 'onCreate').
  Store.prototype.bindToActions = function(actionClass) {
    this.CALLBACKS[actionClass.name] = {};

    /**
      * Loop through the actions defined in the ActionCreator class
      * and set handler method when those actions are dispatched.
      * Handler will be added automatically as long as it follows the
      * naming convention 'on${Action}'. Therefore, a mapping to an
      * action called 'create' should therefore be named 'onCreate'.
    **/

    // TODO: think about how to allow stores to bind to more than one ActionCreator.
    actionClass.ACTIONS.forEach(function(action) {
      var derivedHandler = _deriveHandler(action);

      if (this[derivedHandler] && isFunction(this[derivedHandler])) {
        // Map the store's callback to the action type.
        this.CALLBACKS[actionClass.name][action] = derivedHandler;
      }
    }.bind(this));
  };

  Store.prototype.emitChange = function() {
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

  Store.prototype.listenTo = function(callback, ctx, onAfterBind) {
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
  };

  Store.prototype.stopListeningTo = function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  };

  Store.prototype.constructor = Store;

  return {
    create: function(storeMixin) {
      assign(Store.prototype, EventEmitter.prototype, storeMixin);

      return new Store();
    }
  };
};

module.exports = StoreFactory;
