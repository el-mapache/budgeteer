jest.dontMock('events');
jest.dontMock('../store.js');
jest.dontMock('../../actions/action-creator.js');
jest.dontMock('../../actions/budget-actions.js');

ddescribe('Store', function() {
  var AppDispatcher = require('../../dispatcher/app-dispatcher.js');
  // var EventEmitter = require('events').EventEmitter;

  var actions = require('../../actions/budget-actions.js');
  var Store = require('../store.js')();

  var store;

  AppDispatcher.register.mockReturnValue('ID_1');

  beforeEach(function() {
    store = Store.create({
      init: function() {
        this.bindToActions(actions);
      },
      getInitialState: function() {
        return {
          stokeLevel: 'bummed'
        };
      },
      onCreate: function(data) {
        this.setState(data);
      }
    });
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  afterEach(function() {
    store = null;
    callback = null;
  });


  describe('instantiation', function() {
    it('registers itself with the dispatcher', function() {
      expect(store.dispatchToken).toBeDefined();
    });

    it('maintains an array of callbacks', function() {
      expect(store.CALLBACKS).toBeDefined();
      expect(store.CALLBACKS instanceof Object).toBeTruthy();
    });

    it('is uninitialized on instantiation', function() {
      expect(store.isInitialized()).toBeFalsy();
      expect(Object.keys(store.getState()).length).toBe(0);
    })
  });

  describe('binding actions', function() {
    it('creates a new entry in the callbacks dictionary', function() {
      expect(store.CALLBACKS[actions.name]).toBeDefined();
      expect(Object.keys(store.CALLBACKS).indexOf('BudgetActions')).toNotBe(-1);
    });

    it('calls appropriate callback when an action is dispatched', function() {
      var mockAction = {
        actionType: 'BudgetActions_create',
        data: {
          stokeLevel: 'pitted'
        }
      };

      callback(mockAction);
      expect(store.getState().stokeLevel).toBe('pitted');
    });

    it('initialises itself when a listener is first bound', function() {
      store.listenTo(function(){}, this);
      expect(Object.keys(store.getState()).indexOf('stokeLevel')).toNotBe(-1);
      expect(store.getState().stokeLevel).toBe('bummed');
    });
  });
});
