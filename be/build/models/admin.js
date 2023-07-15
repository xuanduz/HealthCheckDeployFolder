"use strict";

var _require = require("sequelize"),
  Model = _require.Model;
module.exports = function (sequelize, DataTypes) {
  // class Admin extends Model {
  //   static associate(models) {}
  // }
  var Admin = sequelize.define("Admin", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    phoneNumber: DataTypes.STRING,
    role: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING
  }, {
    modelName: "Admin",
    freezeTableName: true,
    // underscored: true,
    tableName: "Admin"
  });
  // Admin.init(
  //   {
  //     email: DataTypes.STRING,
  //     password: DataTypes.STRING,
  //     fullName: DataTypes.STRING,
  //     address: DataTypes.STRING,
  //     gender: DataTypes.BOOLEAN,
  //     phoneNumber: DataTypes.STRING,
  //     role: DataTypes.STRING,

  //     accessToken: DataTypes.STRING,
  //     refreshToken: DataTypes.STRING,
  //   },
  //   {
  //     sequelize,
  //     modelName: "Admin",
  //     freezeTableName: true,
  //     underscored: true,
  //     tableName: "Admin",
  //   }
  // );
  return Admin;
};