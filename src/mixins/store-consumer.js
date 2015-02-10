var assign = require('object-assign');

module.exports = (function consumer() {
  var _STORE = null;

  return class Consumer {
    static fromStore(storeClass) {
      _STORE = storeClass;

      return {
        componentWillMount: function() {
          _STORE.listenTo(this.setState, this, (initialState) => {
            assign(this.state || {}, initialState);
          });
        },

        componentWillUnmount: function() {
          _STORE.stopListeningTo(this.setState, this);
          _STORE = null;
        }
      };
    }
  };
})();
