"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Specialty = sequelize.define(
    "Specialty",
    {
      name: DataTypes.STRING,
      image: DataTypes.TEXT,
      describe: DataTypes.STRING,
      descriptionHTML: DataTypes.TEXT,
    },
    {
      modelName: "Specialty",
      tableName: "Specialty",
      freezeTableName: true,
      // underscored: true,
      // freezeTableName: true,
    }
  );
  Specialty.associate = (models) => {
    models.Specialty.belongsToMany(models.Doctor, {
      through: "Doctor_Specialty",
      foreignKey: "specialtyId",
      as: "doctorData",
      // otherKey: "doctorId",
    });
    models.Specialty.belongsToMany(models.Clinic, {
      through: "Clinic_Specialty",
      foreignKey: "specialtyId",
      as: "clinicData",
      // otherKey: "doctorId",
    });
  };
  return Specialty;
};
