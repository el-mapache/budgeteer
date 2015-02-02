module.exports = function(sequelize, DataTypes) {
  var Budget = sequelize.define('Budget', {
    title:     DataTypes.CHAR,
    startDate: 'Date',
    endDate:   'Date',
    total:     DataTypes.DECIMAL(19,4)
  }, {
    classMethods: {
      associate: function(models) {
        Budget.hasMany(models.Transaction);
        Budget.belongsToMany(models.User);
      }
    }
  });

  return Budget;
};

