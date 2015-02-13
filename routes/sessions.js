exports.new = function(req, res) {

};

exports.create = function(req, res) {

};

exports.destroy = function(req, res) {
  req.logout();
  req.redirect('/');
};