var DateFormatter = require('../src/mixins/date-formatter.js');

module.exports = function(sequelize, DataTypes) {
  var Budget = sequelize.define('Budget', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },

    total: {
      type: DataTypes.DECIMAL(19,2),
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },

    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    startDate: {
      type: 'Date',
      allowNull: false,
      validate: {
        isNotBeforeToday: function(value) {
          return !DateFormatter.isBeforeToday(value);
        }
      }
    },

    endDate: {
      type: 'Date',
      allowNull: false
    }
  }, {
    validate: {
      validEndDate: function() {
        if (DateFormatter.isBeforeDate(this.startDate, this.endDate)) {
          throw new Error('Budget cannot end before it begins.');
        }
      }
    },
    classMethods: {
      associate: function(models) {
        Budget.hasMany(models.Transaction);
        Budget.belongsToMany(models.User, {foreignKey: {name: "UserId"}});
      },

      allForUser: function(userId) {
        var User = sequelize.models.User;
        return User.find(userId).then(function(user) {
          return user.getBudgets({
            include: [{
              model: User,
              attributes: User.basicInfo
            }, {
              model: sequelize.models.Transaction,
              attributes: sequelize.models.Transaction.publicParams,
              include: [{
                model: User,
                attributes: User.basicInfo
              }]
            }]
          });
        });
      },

      oneByOwner: function(userId, budgetId) {
        return Budget.find({
          where: {
            ownerId: userId,
            id: budgetId
          }
        });
      },

      oneForUser: function(userId, budgetId) {
        return sequelize.models.User.find(userId).then(function(user) {
          return user.getBudgets({
            where: {
              id: budgetId,
            },
            include: [{
              model: sequelize.models.User,
              attributes: sequelize.models.User.basicInfo
            },{
              model: sequelize.models.Transaction,
              attributes: sequelize.models.Transaction.publicParams,
              include: [{
                model: sequelize.models.User,
                attributes: sequelize.models.User.basicInfo
              }]
            }],
            attributes: Budget.publicParams
          });
        });
      },

      createForUser: function(userId, attrs) {
        return sequelize.transaction(function(t) {
          return sequelize.models.User.find(userId, {transaction: t}).then(function(user) {
            attrs.ownerId = userId;
            return Budget.create(attrs, {transaction: t}).then(function(budget) {
              // create a join table entry as well.
              return user.addBudget(budget, {transaction: t});
            });
          });
        });
      },

      addUser: function(ownerId, budgetId, userEmail) {
        var defered = sequelize.Promise.defer();

        return sequelize.transaction(function(t) {
          return sequelize.models.User.find({
            where: {
              email: userEmail
            }
          }, {transaction: t}).then(function(user) {
            return Budget.oneByOwner(ownerId, budgetId, {transaction: t}).then(function(budget) {
              console.log(budget.startDate)
              return user.addBudget(budget, {transaction: t}).then(function() {
                defered.resolve(user);
                return defered.promise;
              }).catch(function(e) {
                console.log(e)
              })
            });
          });
        });
      },

      publicParams: ['title', 'total', 'startDate', 'endDate', 'createdAt', 'id']
    },
    hooks: {
      beforeValidate: function(budget, options, fn) {
        var rawTotal = budget.total;

        budget.startDate = DateFormatter.stringToDatetime(budget.startDate);
        budget.endDate = DateFormatter.stringToDatetime(budget.endDate);
        // sanitize money somehow. need to mkae sure it doesnt overflow, 10^15 is largest.
        // sanitize titles? sequelize should do basic cleanup for me.
        fn(null, budget);
      }
    }
  });

  return Budget;
};
