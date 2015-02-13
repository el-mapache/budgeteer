exports.new = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/budgets');
  }

  res.render("index", {budgets: "{}"});
};
