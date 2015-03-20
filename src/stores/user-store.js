var Store = require('./store.js')();
var BudgetStore = require('./budget-store.js');
var BudgetUsersActions = require('../actions/budget-users-actions.js');
var UserActions = require('../actions/user-actions.js');
var models = require('../models/models.js');
var request = require('superagent');
var _  = require('underscore');

var DEFAULT_USER = models.User.build();

var UserStore = Store.create({
  getInitialState: function() {
    return {
      users: {}
    }
  },

  init: function() {
    BudgetStore.listenTo(this._mergeUsers, this);
    this.bindToActions(BudgetUsersActions, {
      'createSuccess': 'getOne'
    }, true);
  },

  getOne: function(data) {
    var id = data.budgetUser.user_id;
    var cachedUser = this.users()[id];

    if (cachedUser) {
      return setTimeout(function() {
        UserActions.getSuccess(cachedUser);
      }.bind(this),0);
    }

    request.get('/users/' + id )
    .set('Accept', 'application/json')
    .end(function afterGetUser(response) {
      if (response.error) {
        console.log('Error fetching user.');
      } else {
        var delta = {};
        delta[id] = response.body.user
        this.setState(this.merge(this.users(), delta));

        return UserActions.getSuccess(delta);
      }
    }.bind(this));

  },

  get: function(userId) {
    var user = this.users()[userId];

    return user ? user : DEFAULT_USER;
  },

  users: function() {
    return this.getState().users;
  },

  _mergeUsers: function(data) {
    if (!data && !data.budgets.length) {
      return;
    }

    var existingUsers = this.users();
    var budgets = data.budgets;

    var usersToAdd = _.reduce(budgets, function(memo, budget) {
      budget.users.forEach(function(user) {
        var userId = user.id;

        if (!existingUsers[userId]) {
          memo[userId] = models.User.build(user);
        }
      });
      return memo;
    },{});

    // No new users, return.
    // TODO not sure if this is necessary, dont know if setState will treat the merged
    // object with no new keys as 'changes' or not.
    if (!Object.keys(usersToAdd).length) {
      return;
    }

    this.setState({users: this.merge(existingUsers, usersToAdd)});
  }
});

module.exports = UserStore;
