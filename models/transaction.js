module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    amount:            DataTypes.DECIMAL(19,4),
    purchasedOn:       'Date',
    title:             DataTypes.CHAR,
    description:       DataTypes.TEXT,
    percentageToSplit: DataTypes.INTEGER(3)
  }, {
    classMethods: {
      associate: function(models) {
        Transaction.belongsTo(models.Category);
        Transaction.belongsTo(models.Budget);
        Transaction.belongsTo(models.User);
      }
    }
  });

  return Transaction;
};
