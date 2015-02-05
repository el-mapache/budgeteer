jest.dontMock('../action-creator.js');

function buildActionCreator(...actions) {
  var ActionCreator = require('../action-creator.js');

  class Actions extends ActionCreator {
    constructor() {
      super();
      this.generateActions(actions);
    }
  }

  return Actions;
}

describe('ActionCreator', function() {
  var MockActions, AppDispatcher;

  AppDispatcher = require('../../dispatcher/app-dispatcher.js');
  MockActions = buildActionCreator('action1', 'action2');

  describe('creating a new action class', function() {
    it('should set a name property automagically', function() {
      let actions = new MockActions();

      expect(actions.name).toBeDefined();
      expect(actions.name).toBe('Actions');
    });

    it('accepts a single action in generateActions', function() {
      let Actions1 = buildActionCreator('action1');
      let actions1 = new Actions1();

      expect(actions1['action1']).toBeDefined();
    });

    it('creates methods for each of the supplied actions', function() {
      let actions = new MockActions();

      expect(actions['action1']).toBeDefined()
      expect(actions['action2']).toBeDefined()
    });
  });

  describe('calling actions', function() {
    it('dispatches a message properly', function() {
      let actions = new MockActions();

      actions.action1();
      expect(AppDispatcher.dispatch.mock.calls.length).toNotBe(0);
    });
  });
});
