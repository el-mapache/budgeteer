module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.CHAR,
    lastName:  DataTypes.CHAR,
    email:     DataTypes.CHAR,
    photo:     DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Budget);
        User.hasMany(models.Transaction);
      }
    }
  });

  return User;
};

