module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username:  DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName:  DataTypes.STRING,
    email:     {
      type: DataTypes.STRING,
      allowNull: false
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
          if (!user) {
            user = User.createWithIdentity(email, profile, token);
          }

          var defered = sequelize.Promise.defer();
          defered.resolve(user);
          return defered.promise;
        });
      },

      createWithIdentity: function(email, profile, token) {
        return User.create({
          email: email,
          lastName: profile.name.familyName.trim(),
          firstName: profile.name.givenName.trim()
        }).then(function(user) {
          sequelize.models.Identity.create({
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
