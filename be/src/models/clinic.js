"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Clinic = sequelize.define(
    "Clinic",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      provinceKey: DataTypes.STRING,
      address: DataTypes.STRING,
      image: DataTypes.TEXT,
      descriptionHTML: DataTypes.TEXT,
      describe: DataTypes.STRING,
    },
    {
      modelName: "Clinic",
      tableName: "Clinic",
      freezeTableName: true,
      // underscored: true,
    }
  );

  Clinic.associate = (models) => {
    models.Clinic.hasMany(models.Doctor, {
      foreignKey: "clinicId",
      as: "doctorData",
    });
    models.Clinic.belongsTo(models.Code, {
      foreignKey: "provinceKey",
      targetKey: "key",
      as: "provinceData",
    });
    models.Clinic.belongsToMany(models.Specialty, {
      through: "Clinic_Specialty",
      foreignKey: "clinicId",
      as: "specialtyData",
    });
  };

  return Clinic;
};
