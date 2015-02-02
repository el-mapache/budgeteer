module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username:  DataTypes.CHAR,
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
