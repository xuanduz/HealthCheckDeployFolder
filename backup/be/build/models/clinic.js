"use strict";

var _require = require("sequelize"),
  Model = _require.Model;
module.exports = function (sequelize, DataTypes) {
  var Clinic = sequelize.define("Clinic", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    provinceKey: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.TEXT,
    descriptionHTML: DataTypes.TEXT,
    describe: DataTypes.STRING
  }, {
    modelName: "Clinic",
    tableName: "Clinic",
    freezeTableName: true
    // underscored: true,
  });

  Clinic.associate = function (models) {
    models.Clinic.hasMany(models.Doctor, {
      foreignKey: "clinicId",
      as: "doctorData"
    });
    models.Clinic.belongsTo(models.Code, {
      foreignKey: "provinceKey",
      targetKey: "key",
      as: "provinceData"
    });
    models.Clinic.belongsToMany(models.Specialty, {
      through: "Clinic_Specialty",
      foreignKey: "clinicId",
      as: "specialtyData"
    });
  };
  return Clinic;
};