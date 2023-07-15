"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      doctorId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      statusKey: DataTypes.STRING,
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      timeSlot: DataTypes.STRING,
      reason: DataTypes.STRING,
      bookingType: DataTypes.STRING,
      resultFile: DataTypes.STRING,
    },
    {
      modelName: "Appointment",
      tableName: "Appointment",
      freezeTableName: true,
      // underscored: true,
    }
  );
  Appointment.associate = function (models) {
    models.Appointment.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patientData",
    });
    models.Appointment.belongsTo(models.Doctor, {
      foreignKey: "doctorId",
      as: "doctorData",
    });
    models.Appointment.belongsTo(models.Clinic, {
      foreignKey: "clinicId",
      as: "clinicData",
    });
    models.Appointment.belongsTo(models.Code, {
      foreignKey: "statusKey",
      targetKey: "key",
      as: "statusData",
    });
    models.Appointment.belongsTo(models.Code, {
      foreignKey: "timeSlot",
      targetKey: "key",
      as: "timeData",
    });
    models.Appointment.belongsTo(models.Code, {
      foreignKey: "bookingType",
      targetKey: "key",
      as: "bookingData",
    });
  };

  return Appointment;
};
