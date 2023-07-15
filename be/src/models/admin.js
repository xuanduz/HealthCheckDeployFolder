"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  // class Admin extends Model {
  //   static associate(models) {}
  // }
  const Admin = sequelize.define(
    "Admin",
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.BOOLEAN,
      phoneNumber: DataTypes.STRING,
      role: DataTypes.STRING,

      accessToken: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
    },
    {
      modelName: "Admin",
      freezeTableName: true,
      // underscored: true,
      tableName: "Admin",
    }
  );
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
