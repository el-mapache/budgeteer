jest.dontMock('../store.js');
jest.dontMock('../../actions/action-creator.js');
jest.dontMock('../../actions/budget-actions.js');

describe('Store', function() {
  let actions = require('../../actions/budget-actions.js');
  let Store = require('../store.js');
  let AppDispatcher = require('../../dispatcher/app-dispatcher.js');

  class SweetStore extends Store {
    constructor() {
      super();
      this.bindToActions(actions);
    }

    setInitialState() {
      return {
        stokeLevel: 'bummed'
      }
    }

    onCreate(data) {
      this.setState(data);
    }
  }

  AppDispatcher.register.mockReturnValue('ID_1');
  var store;

  beforeEach(function() {
    store = new SweetStore();
  })

  var callback = AppDispatcher.register.mock.calls[0][0];

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
      let mockAction = {
        actionType: 'BudgetActions_create',
        data: {
          stokeLevel: 'pitted'
        }
      };

      callback(mockAction);
      expect(store.getState().stokeLevel).toBe('pitted');
    });

    it('initialises itself when first bound', function() {
      let store = new SweetStore();
      expect(store.getState()).toBe({});
    });
  });
});
