"use strict";

var _require = require("sequelize"),
  Model = _require.Model;
module.exports = function (sequelize, DataTypes) {
  var Specialty = sequelize.define("Specialty", {
    name: DataTypes.STRING,
    image: DataTypes.TEXT,
    describe: DataTypes.STRING,
    descriptionHTML: DataTypes.TEXT
  }, {
    modelName: "Specialty",
    tableName: "Specialty",
    freezeTableName: true
    // underscored: true,
    // freezeTableName: true,
  });

  Specialty.associate = function (models) {
    models.Specialty.belongsToMany(models.Doctor, {
      through: "Doctor_Specialty",
      foreignKey: "specialtyId",
      as: "doctorData"
      // otherKey: "doctorId",
    });

    models.Specialty.belongsToMany(models.Clinic, {
      through: "Clinic_Specialty",
      foreignKey: "specialtyId",
      as: "clinicData"
      // otherKey: "doctorId",
    });
  };

  return Specialty;
};