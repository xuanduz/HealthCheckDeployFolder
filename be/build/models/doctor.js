"use strict";

var _require = require("sequelize"),
  Model = _require.Model;
module.exports = function (sequelize, DataTypes) {
  var Doctor = sequelize.define("Doctor", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    phoneNumber: DataTypes.STRING,
    image: DataTypes.STRING,
    descriptionHTML: DataTypes.TEXT,
    describe: DataTypes.STRING,
    provinceKey: DataTypes.STRING,
    positionKey: DataTypes.STRING,
    price: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING
  }, {
    modelName: "Doctor",
    tableName: "Doctor",
    freezeTableName: true
    // underscored: true,
  });

  Doctor.associate = function (models) {
    models.Doctor.belongsTo(models.Clinic, {
      foreignKey: "clinicId",
      as: "clinicData"
    });
    models.Doctor.belongsTo(models.Code, {
      foreignKey: "positionKey",
      targetKey: "key",
      as: "positionData"
    });
    models.Doctor.belongsTo(models.Code, {
      foreignKey: "provinceKey",
      targetKey: "key",
      as: "provinceDoctorData"
    });
    models.Doctor.belongsToMany(models.Specialty, {
      through: "Doctor_Specialty",
      foreignKey: "doctorId",
      as: "specialtyData"
      // otherKey: "specialtyId",
    });

    models.Doctor.hasMany(models.Schedule, {
      foreignKey: "doctorId",
      as: "scheduleData"
    });
    models.Doctor.hasMany(models.Appointment, {
      foreignKey: "doctorId",
      as: "appointmentData"
    });
  };
  return Doctor;
};