"use strict";

var _require = require("sequelize"),
  Model = _require.Model;
module.exports = function (sequelize, DataTypes) {
  var Clinic_Specialty = sequelize.define("Clinic_Specialty", {
    clinicId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER
  }, {
    modelName: "Clinic_Specialty",
    tableName: "Clinic_Specialty",
    freezeTableName: true
    // underscored: true,
  });
  // Clinic_Specialty.init(
  //   {
  //     clinicId: DataTypes.INTEGER,
  //     specialtyId: DataTypes.INTEGER,
  //   },
  //   {
  //     sequelize,
  //     modelName: "Clinic_Specialty",
  //     tableName: "Clinic_Specialty",
  //     freezeTableName: true,
  //   }
  // );
  return Clinic_Specialty;
};