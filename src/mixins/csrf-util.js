module.exports = {
  getToken: function() {
    return document.querySelector('[name="csrf-token"]').getAttribute('content');
  }
};
