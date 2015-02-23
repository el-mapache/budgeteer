var assign = require('object-assign');

var Consumer = {
  fromStore: function(storeClass) {
    var _STORE = storeClass;

    return {
      componentWillMount: function() {
        console.log(_STORE)
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

module.exports = Consumer;
