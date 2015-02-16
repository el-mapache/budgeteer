module.exports = function(sequelize, DataTypes) {
  var models = sequelize.models;

  var User = sequelize.define('User', {
    username:  DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName:  DataTypes.STRING,
    email:     {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true
    },
    photo: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Budget);
        User.hasMany(models.Transaction);
      },

      findByAuthOrCreate: function(profile, token) {
        var userEmails = profile.emails.reduce(function(memo, emailObj) {
          memo.push(emailObj.value);

          return memo;
        }, []);

        var email = userEmails[0].trim();

        return User.find({
          where: {
            email: email
          }
        }).then(function(user) {
          // this is an anti-pattern apparently, but it works, so, whatever
          var defered = sequelize.Promise.defer();

          if (!user) {
            defered.resolve(User.createWithIdentity(email, profile, token));
          } else {
            defered.resolve(user);
          }

          return defered.promise;
        });
      },

      createWithIdentity: function(email, profile, token) {
        return User.create({
          email: email,
          lastName: profile.name.familyName.trim(),
          firstName: profile.name.givenName.trim()
        }).then(function(user) {
          return models.Identity.create({
            UserId: user.id,
            provider: profile.provider,
            uid: profile.id,
            token: token,
            email: user.email
          }).then(function(res) {
            return user;
          });
        });
      }
    }
  });

  return User;
};
