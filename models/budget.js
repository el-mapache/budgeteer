var moment = require('moment');

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
          return moment(value).isAfter(moment().subtract(1, 'd'));
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
        if (moment(this.endDate).isBefore(moment(this.startDate))) {
          throw new Error('Budget cannot end before it begins.');
        } else if (!(moment(this.startDate).diff(moment(this.endDate)))) {
          throw new Error('Must must be more than a day long.');
        }
      }
    },
    classMethods: {
      associate: function(models) {
        Budget.hasMany(models.Transaction);
        Budget.belongsToMany(models.User);
      },

      allForUser: function(userId) {
        var query = 'SELECT b.* FROM "Budgets" AS "b" INNER JOIN "BudgetsUsers" AS "bu" ON "bu"."BudgetId"="b"."id" WHERE "bu"."UserId"=:id';
        return sequelize.query(query, Budget, { raw: false }, { id: userId });
      },

      oneForUser: function(userId, budgetId) {
        var query = 'SELECT "b".* FROM "Budgets" AS "b" INNER JOIN "BudgetsUsers" AS "bu" ON "bu"."BudgetId"="b"."id" WHERE "bu"."UserId"=:UserId AND "bu"."BudgetId"=:BudgetId';
        return sequelize.query(query, Budget, { raw: false }, { BudgetId: budgetId, UserId: userId });
      },

      createForUser: function(userId, attrs) {
        return sequelize.transaction(function(t) {
          return Budget.create(attrs, {transaction: t}).then(function(budget) {
            return User.find(userId, {transaction: t}).then(function(user) {
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

        budget.startDate = budget.formatDate(budget.startDate);
        budget.endDate = budget.formatDate(budget.endDate);
        // sanitize money somehow. need to mkae sure it doesnt overflow, 10^15 is largest.
        // sanitize titles? sequelize should do basic cleanup for me.
        fn(null, budget);
      }
    },
    instanceMethods: {
      formatDate: function(dateString) {
        if (!dateString) {
          return null;
        }

        return moment(dateString.replace('-', ' '), 'DD MM YYYY').format();
      }
    }
  });

  return Budget;
};
