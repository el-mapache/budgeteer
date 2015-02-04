jest.dontMock('../action-creator.js');

describe('ActionCreator', function() {

  var MockActions, AppDispatcher, ActionCreator, actions;

  AppDispatcher = require('../../dispatcher/app-dispatcher.js');
  ActionCreator = require('../action-creator.js');


  MockActions = class MockActions extends ActionCreator {
    constructor() {
      super();
      this.generateActions('action1', 'action2');
    }
  };

  actions = new MockActions();

  describe('creating a new action class', function() {
    it('should set a name property automagically', function() {
      actions = new MockActions();

      expect(actions.name).toBeDefined();
      expect(actions.name).toBe('MockActions');
    });

    it('creates methods for each of the supplied actions', function() {
      actions = new MockActions();

      expect(actions['action1']).toBeDefined()
      expect(actions['action2']).toBeDefined()
    });
  });

  describe('calling actions', function() {
    it('dispatches a message properly', function() {
      actions = new MockActions();

      actions.action1();
      expect(AppDispatcher.dispatch.mock.calls.length).toNotBe(0);
    });
  });
});
