"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Doctor_Specialty = sequelize.define(
    "Doctor_Specialty",
    {
      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
    },
    {
      modelName: "Doctor_Specialty",
      tableName: "Doctor_Specialty",
      freezeTableName: true,
      // underscored: true,
    }
  );
  return Doctor_Specialty;
};
