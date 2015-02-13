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

      allBudgets: function(id) {
        return sequelize.transaction(function(t) {
          return User.find(id, {transaction: t}).then(function(user) {
            return user.getBudgets({
              attributes: models.Budget.publicParams,
              joinTableAttributes: []
            });
          });
        });
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
          models.Identity.create({
            UserId: user.id,
            provider: profile.provider,
            uid: profile.id,
            token: token,
            email: user.email
          }).then(function(res) {
            return user;
          });
        });
      },

      createBudget: function(userId, budgetAttrs) {
        // Start a transaction to atomicize budget creation
        return sequelize.transaction(function(t) {
          return User.find(userId, {transaction: t}).then(function(user) {
            return models.Budget.create(budgetAttrs, {transaction: t}).then(function(budget) {
              // assign user to be owner of budget, automatically creates join table entry.
              return user.addBudget(budget, {transaction: t});
            });
          });
        });
      }
    }
  });

  return User;
};
