// module.exports = function(sequelize, DataTypes) {
//   var Category = sequelize.define('Category', {
//     name: DataTypes.CHAR
//   }, {
//     classMethods: {
//       associate: function(models) {
//         Category.hasMany(models.Transaction);
//       }
//     }
//   });

//   return Category;
// };

module.exports = [
  'Rent',
  'Household',
  'Leisure'
];
