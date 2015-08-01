// Movie model

module.exports = function (sequelize, DataTypes) {

  var Movie = sequelize.define('Movie', {
    name: { type: DataTypes.STRING, notEmpty: true, unique: true, allowNull: false },
    a: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
    s: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false }
  });

  return Movie;
};

