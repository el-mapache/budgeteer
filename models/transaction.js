var ValidCategories = require('../src/category.js');
var assign = require('object-assign');
var DateFormatter = require('../src/mixins/date-formatter.js');

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
        if (value <  0 || value > 100) {
          throw new Error('Must be a value between 0 and 100');
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: function(value) {
        if (ValidCategories.indexOf(value) === -1) {
          throw new Error('Selected category is invalid.');
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Transaction.belongsTo(models.Budget, {foreignKey: {allowNull: false}});
        Transaction.belongsTo(models.User, {foreignKey: {allowNull: false }});
      },

      allForBudget: function(userId, budgetId) {
        return sequelize.models.User.find(userId).then(function(user) {
          return user.getTransactions({
            where: {
              BudgetId: budgetId
            },
            attributes: Transaction.publicParams,
            include: [{
              model: sequelize.models.User,
              attributes: ['firstName', 'photo']
            }]
          })
        });
      },

      publicParams: ['category', 'purchasedOn', 'amount', 'percentageToSplit', 'id', 'title', 'description', 'createdAt', 'BudgetId'],

      addToBudget: function(userId, attrs) {
        var newAttrs = assign(attrs, {UserId: userId});
        return Transaction.create(newAttrs);
      }
    },
    hooks: {
      beforeCreate: function(t, options, done) {
        t.purchasedOn = DateFormatter.stringToDatetime(t.purchasedOn);
        done(null, t);
      }
    }
  });

  return Transaction;
};
