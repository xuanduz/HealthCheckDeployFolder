"use strict";

var _require = require("sequelize"),
  Model = _require.Model;
module.exports = function (sequelize, DataTypes) {
  var Patient = sequelize.define("Patient", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    birthday: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    provinceKey: DataTypes.STRING,
    addressDetail: DataTypes.STRING,
    codePassword: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING
  }, {
    modelName: "Patient",
    tableName: "Patient",
    freezeTableName: true
    // underscored: true,
  });

  Patient.associate = function (models) {
    models.Patient.hasMany(models.Appointment, {
      foreignKey: "patientId",
      as: "appointmentData"
    });
    models.Patient.belongsTo(models.Code, {
      foreignKey: "provinceKey",
      targetKey: "key",
      as: "provincePatientData"
    });
  };
  return Patient;
};