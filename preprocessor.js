var ReactTools = require('react-tools');
var to5 = require('6to5');

module.exports = {
  process: function(src) {
    return to5.transform(src).code;
  }
};
