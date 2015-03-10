var User = require('../models').User;

exports.show = function(req, res) {
  var id = req.params.id;

  User.find({
    where: {
      id: id
    },
    attributes: ['firstName', 'photo']
  }).then(function(user) {
    res.format({
      html: function() {
        if (user) {
          res.status(200).render('index', {user: user});
        } else {
          res.status(404).render('404', {errors: [{ message: 'User not found.'}]});
        }
      },

      json: function() {
        if (user) {
          res.status(200).json({user: user});
        } else {
          res.status(404).json({errors: [{ message: 'User not found.'}]});
        }
      }
    });
  }).catch(function(error) {
    console.log('ERROR', error);
    res.status(500).json({errors: [error]});
  });
};