"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Code = sequelize.define(
    "Code",
    {
      key: {
        type: DataTypes.STRING,
        unique: true,
      },
      type: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    {
      modelName: "Code",
      tableName: "Code",
      freezeTableName: true,
      // underscored: true,
    }
  );

  Code.associate = (models) => {
    models.Code.hasMany(models.Clinic, {
      foreignKey: "provinceKey",
      targetKey: "key",
      as: "provinceData",
    });
    models.Code.hasMany(models.Schedule, {
      foreignKey: "timeSlot",
      targetKey: "key",
      as: "timeScheduleData",
    });
    models.Code.hasMany(models.Patient, {
      foreignKey: "provinceKey",
      targetKey: "key",
      as: "provincePatientData",
    });
    models.Code.hasMany(models.Appointment, {
      foreignKey: "statusKey",
      targetKey: "key",
      as: "statusData",
    });
    models.Code.hasMany(models.Appointment, {
      foreignKey: "timeSlot",
      targetKey: "key",
      as: "timeAppointmentData",
    });
    models.Code.hasMany(models.Appointment, {
      foreignKey: "bookingType",
      targetKey: "key",
      as: "bookingData",
    });
    models.Code.hasMany(models.Doctor, {
      foreignKey: "positionKey",
      targetKey: "key",
      as: "positionData",
    });
    models.Code.hasMany(models.Doctor, {
      foreignKey: "provinceKey",
      targetKey: "key",
      as: "provinceDoctorData",
    });
  };

  return Code;
};
