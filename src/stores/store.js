var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/app-dispatcher.js');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var StoreFactory = function() {
  var _STATE = {};

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

      // This store hasn't been bound to the action class whose event is being dispatched.
      // We know there are no callbacks to execute so we return.
      // TODO test
      if (!(actionClass in this.CALLBACKS)) {
        return;
      }

      // Do we have a mapping to a valid method name on this store?
      var callback = this.CALLBACKS[actionClass][handler];

      if (callback) {
        this[callback](payload.data);
      }

      return true;
    }.bind(this));

    this.setState(this.getInitialState());
    this.init();
  }

  Store.prototype.merge = assign;
  Store.prototype.init = function() {};

  Store.prototype.getInitialState = function() {
    return {};
  };

  Store.prototype.getState = function() {
    return _STATE;
  };

  Store.prototype.setState = function(newState) {
    _STATE = this.merge(this.getState(), newState);
    this.emitChange();
  };

  /**
    * Create a dictionary with mappings from an action (i.e. 'create'),
    * to methods names on this class (i.e. 'onCreate').
    *
    * @param {actionClass} object An instance of an ActionCreator class.
    * @param {map} object A dictionary of bindings from actions to action names.
    *   Allows for creation of manual bindings to actions rather than automatically deriving
    *   them based on the name of the action.
    * @param {skipAutoBind} boolean skip creation of automatic bindings to store actions.
    *
    * For example:
    *
    * myStore.bindToActions(UserActions, {
    *   'afterCreate': 'mergeUsers'
    * });
    *
    * If the supplied callback does not exist on the store, a
    * noop function will be registered.
    * All non-specified actions will be auto bound unless the skipAutoBind
    * is true.
  **/

  Store.prototype.bindToActions = function(actionClass, map, skipAutoBind) {
    var callbacks = this.CALLBACKS[actionClass.name] = {};


    if (typeof map === 'object') {
      for (var action in map) {
        var handler = map[action];
        callbacks[action] = isFunction(this[handler]) ? handler : function(){};
      }
    }

    if (map && skipAutoBind) {
      return;
    }

    /**
      * Loop through the actions defined in the ActionCreator class
      * and set handler method when those actions are dispatched.
      * Handler will be added automatically as long as it follows the
      * naming convention 'on${Action}'. Therefore, a mapping to an
      * action called 'create' should therefore be named 'onCreate'.
    **/
    actionClass.ACTIONS.forEach(function(action) {
      if (callbacks[action]) {
        return;
      }

      var derivedHandler = _deriveHandler(action);

      if (this[derivedHandler] && isFunction(this[derivedHandler])) {
        // Map the store's callback to the action type.
        callbacks[action] = derivedHandler;
      }
    }.bind(this));
  };

  Store.prototype.emitChange = function() {
    this.emit(CHANGE_EVENT);
  };

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
