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
        Budget.belongsToMany(models.User);
      },

      allForUser: function(userId) {
        return sequelize.models.User.find(userId).then(function(user) {
          return user.getBudgets({
            include: [{
              model: sequelize.models.User,
              attributes: ['firstName', 'photo']
            }, {
              model: sequelize.models.Transaction,
              attributes: sequelize.models.Transaction.publicParams,
              include: [{
                model: sequelize.models.User,
                attributes: ['firstName', 'photo']
              }]
            }]
          });
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
              attributes: ['firstName', 'photo']
            },{
              model: sequelize.models.Transaction,
              attributes: sequelize.models.Transaction.publicParams,
              include: [{
                model: sequelize.models.User,
                attributes: ['firstName', 'photo']
              }]
            }]
          });
        });
      },

      createForUser: function(userId, attrs) {
        return sequelize.transaction(function(t) {
          return Budget.create(attrs, {transaction: t}).then(function(budget) {
            return sequelize.models.User.find(userId, {transaction: t}).then(function(user) {
              // assign user to be owner of budget, automatically creates join table entry.
              return user.addBudget(budget, {transaction: t});
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
