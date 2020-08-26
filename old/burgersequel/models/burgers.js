// ===============
'use strict';
module.exports = function (sequelize, DataTypes) {
  var burgers = sequelize.define('burgers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    eaten: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
  }, {
    timestamps: false
  });
  return burgers;
};