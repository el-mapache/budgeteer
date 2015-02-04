var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

// Passing an empty object for now to be extended.
var AppDispatcher = assign(new Dispatcher(), {});

module.exports = AppDispatcher;
