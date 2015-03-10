var Store = require('./store.js')();
var request = require('superagent');

module.exports = Store.create({
  getInitialState: function() {
    return {
      users: {}
    }
  },

  get: function(userId) {
    var user = this.users[userId];

    return user ? user : this._getUserFromServer(userId);
  },

  users: function() {
    return this.getState().users;
  },

  _getUserFromServer: function(userId) {
    var self = this;

    return request.get('/users')
    .set('Accept', 'application/json')
    .end(function onAfterGet(res) {
      if (res.ok) {
        var user = res.body.user;
        self.setState({userId: user});
        return user;
      } else {
        // TODO error handling
        return {};
      }
    });
  }
});
