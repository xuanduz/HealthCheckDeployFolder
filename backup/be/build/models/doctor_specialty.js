"use strict";

var _require = require("sequelize"),
  Model = _require.Model;
module.exports = function (sequelize, DataTypes) {
  var Doctor_Specialty = sequelize.define("Doctor_Specialty", {
    doctorId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER
  }, {
    modelName: "Doctor_Specialty",
    tableName: "Doctor_Specialty",
    freezeTableName: true
    // underscored: true,
  });

  return Doctor_Specialty;
};