"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _require = require("sequelize"),
  Model = _require.Model;
module.exports = function (sequelize, DataTypes) {
  var _sequelize$define;
  var Appointment = sequelize.define("Appointment", (_sequelize$define = {
    doctorId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER
  }, _defineProperty(_sequelize$define, "clinicId", DataTypes.INTEGER), _defineProperty(_sequelize$define, "statusKey", DataTypes.STRING), _defineProperty(_sequelize$define, "date", DataTypes.STRING), _defineProperty(_sequelize$define, "time", DataTypes.STRING), _defineProperty(_sequelize$define, "timeSlot", DataTypes.STRING), _defineProperty(_sequelize$define, "reason", DataTypes.STRING), _defineProperty(_sequelize$define, "bookingType", DataTypes.STRING), _defineProperty(_sequelize$define, "resultFile", DataTypes.STRING), _sequelize$define), {
    modelName: "Appointment",
    tableName: "Appointment",
    freezeTableName: true
    // underscored: true,
  });

  Appointment.associate = function (models) {
    models.Appointment.belongsTo(models.Patient, {
      foreignKey: "patientId",
      as: "patientData"
    });
    models.Appointment.belongsTo(models.Doctor, {
      foreignKey: "doctorId",
      as: "doctorData"
    });
    models.Appointment.belongsTo(models.Clinic, {
      foreignKey: "clinicId",
      as: "clinicData"
    });
    models.Appointment.belongsTo(models.Code, {
      foreignKey: "statusKey",
      targetKey: "key",
      as: "statusData"
    });
    models.Appointment.belongsTo(models.Code, {
      foreignKey: "timeSlot",
      targetKey: "key",
      as: "timeData"
    });
    models.Appointment.belongsTo(models.Code, {
      foreignKey: "bookingType",
      targetKey: "key",
      as: "bookingData"
    });
  };
  return Appointment;
};