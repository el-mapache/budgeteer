module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define('Transaction', {
    amount:            DataTypes.DECIMAL(19,2),
    purchasedOn:       'Date',
    purchasedFrom:     DataTypes.STRING,
    title:             DataTypes.STRING,
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
