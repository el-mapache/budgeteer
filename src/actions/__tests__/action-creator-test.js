jest.dontMock('../action-creator.js');

describe('ActionCreator', function() {
  var ActionCreator = require('../action-creator.js');

  var AppDispatcher;
  var MockActions = class MockActions extends ActionCreator {
    constructor() {
      super();
      this.generateActions('action1', 'action2');
    }
  };
  var actions;

  beforeEach(function() {
    AppDispatcher = require('../../dispatcher/app-dispatcher.js');
  });

  describe('creating a new action class', function() {
    it('should set a name property automagically', function() {
      var actions = new MockActions();
      expect(actions.name).toBeDefined();
      expect(actions.name).toBe('MockActions');
    });

    it('creates methods for each of the supplied actions', function() {
      var actions = new MockActions();

      expect(actions['action1']).toBeDefined()
      expect(actions['action2']).toBeDefined()
    });
  });
});
