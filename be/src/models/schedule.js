"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    "Schedule",
    {
      date: DataTypes.STRING,
      timeSlot: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
      currentNumber: DataTypes.INTEGER,
      maxNumber: DataTypes.INTEGER,
    },
    {
      modelName: "Schedule",
      tableName: "Schedule",
      freezeTableName: true,
      // underscored: true,
      // freezeTableName: true,
    }
  );

  Schedule.associate = (models) => {
    models.Schedule.belongsTo(models.Doctor, {
      foreignKey: "doctorId",
      as: "doctor",
    });
    models.Schedule.belongsTo(models.Code, {
      foreignKey: "timeSlot",
      targetKey: "key",
      as: "timeData",
    });
  };

  return Schedule;
};
