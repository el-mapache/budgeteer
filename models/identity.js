module.exports = function(sequelize, DataTypes) {
  var Identity = sequelize.define('Identity', {
    provider: {
      type: DataTypes.STRING,
      allowNull: false
    },

    uid: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    token: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: sequelize.models.User,
      referencesKey: 'id',
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }
  }, {
    classMethods: {
      associate: function(models) {
        Identity.belongsTo(models.User);
      }
    }
  });

  return Identity;
};
