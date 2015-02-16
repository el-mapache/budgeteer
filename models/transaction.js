var ValidCategories = require('../src/category.js');
var assign = require('object-assign');

//TODO: add a base model class at some point
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    amount: {
      type: DataTypes.DECIMAL(19,2),
      allowNull: false
    },
    purchasedOn: {
      type: 'Date',
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    percentageToSplit: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      validate: function(value) {
        if (value <= 0 || value > 100) {
          throw new Error('Must be a non-zero value between 1 and 100');
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: function(value) {
        if (ValidCategories.indexOf(value) === -1) {
          throw new Error('Category must be one of the valid category types.');
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Transaction.belongsTo(models.Budget);
        Transaction.belongsTo(models.User);
      },

      allForBudget: function(userId, budgetId) {
        var query = 'SELECT t.* FROM "Transactions" AS "t" WHERE "t"."BudgetId"=:budgetId AND "t"."UserId"=:userId';
        var idsObj = {
          userId: userId,
          budgetId: budgetId
        };

        return sequelize.query(query, Transaction, { raw: false }, idsObj);
      },

      addToBudget: function(userId, attrs) {
        return Transaction.create(assign(attrs, {UserId: userId}));
      }
    }
  });

  return Transaction;
};
