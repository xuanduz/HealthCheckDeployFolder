"use strict";

var _express = _interopRequireDefault(require("express"));
var _admin = _interopRequireDefault(require("../controller/admin/admin.controller"));
var _authAdmin = _interopRequireDefault(require("../controller/admin/auth.admin.controller"));
var _doctorAdmin = _interopRequireDefault(require("../controller/admin/doctor.admin.controller"));
var _clinicAdmin = _interopRequireDefault(require("../controller/admin/clinic.admin.controller"));
var _specialtyAdmin = _interopRequireDefault(require("../controller/admin/specialty.admin.controller"));
var _appointmentAdmin = _interopRequireDefault(require("../controller/admin/appointment.admin.controller"));
var _patient = _interopRequireDefault(require("../controller/patient/patient.controller"));
var _doctorPatient = _interopRequireDefault(require("../controller/patient/doctor.patient.controller"));
var _clinicPatient = _interopRequireDefault(require("../controller/patient/clinic.patient.controller"));
var _specialtyPatient = _interopRequireDefault(require("../controller/patient/specialty.patient.controller"));
var _authPatient = _interopRequireDefault(require("../controller/patient/auth.patient.controller"));
var _appointmentPatient = _interopRequireDefault(require("../controller/patient/appointment.patient.controller"));
var _authDoctor = _interopRequireDefault(require("../controller/doctor/auth.doctor.controller"));
var _doctor = _interopRequireDefault(require("../controller/doctor/doctor.controller"));
var _scheduleDoctor = _interopRequireDefault(require("../controller/doctor/schedule.doctor.controller"));
var _appointmentDoctor = _interopRequireDefault(require("../controller/doctor/appointment.doctor.controller"));
var _appointmentDoctor2 = _interopRequireDefault(require("../services/doctor/appointment.doctor.service"));
var _routeName = require("./route-name");
var _token = require("../utils/auth/token");
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var upload = (0, _multer["default"])({
  storage: _multer["default"].memoryStorage()
});

/**
 *
 * @swagger
 * /api/system-admin/register:
 *   post:
 *    summary: Get a user by ID
 * responses:
 *      '200':
 *       description: A single user.
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *        properties:
 *         id:
 *          type: integer
 *       name:
 *        type: string
 */
var initWebRoutes = function initWebRoutes(app) {
  // ------------------ Admin -----------------------

  router.post("".concat(_routeName.RouteName.ADMIN, "/register"), _token.verifyToken, _authAdmin["default"].register);
  router.post("".concat(_routeName.RouteName.ADMIN, "/login"), _authAdmin["default"].login);
  router["delete"]("".concat(_routeName.RouteName.ADMIN, "/logout"), _token.verifyToken, _authAdmin["default"].logout);
  router.post("".concat(_routeName.RouteName.ADMIN, "/token"), _authAdmin["default"].getNewAccessToken);
  router.post("".concat(_routeName.RouteName.ADMIN, "/admin/edit"), _token.verifyToken, _admin["default"].editAdmin);
  router.post("".concat(_routeName.RouteName.ADMIN, "/change-password"), _token.verifyToken, _admin["default"].changePasswordAdmin);
  router.post("".concat(_routeName.RouteName.ADMIN, "/doctor/add-new"), _token.verifyToken, upload.single("filename"), _doctorAdmin["default"].addNewDoctor);
  router.get("".concat(_routeName.RouteName.ADMIN, "/doctor/:id"), _token.verifyToken, _doctorAdmin["default"].getDoctor);
  router.post("".concat(_routeName.RouteName.ADMIN, "/doctor/filter"), _token.verifyToken, _doctorAdmin["default"].filterDoctor);
  router.post("".concat(_routeName.RouteName.ADMIN, "/doctor/edit"), _token.verifyToken, upload.single("filename"), _doctorAdmin["default"].editDoctor);
  router["delete"]("".concat(_routeName.RouteName.ADMIN, "/doctor/:id"), _token.verifyToken, _doctorAdmin["default"].deleteDoctor);
  router.get("".concat(_routeName.RouteName.ADMIN, "/doctor/get-by-clinic/:id"), _token.verifyToken, _doctorAdmin["default"].getDoctorByClinic);
  router.post("".concat(_routeName.RouteName.ADMIN, "/specialty/filter"), _token.verifyToken, _specialtyAdmin["default"].filterSpecialty);
  router.post("".concat(_routeName.RouteName.ADMIN, "/specialty/edit"), _token.verifyToken, upload.single("filename"), _specialtyAdmin["default"].editSpecialty);
  router.post("".concat(_routeName.RouteName.ADMIN, "/specialty/add-new"), _token.verifyToken, upload.single("filename"), _specialtyAdmin["default"].addNewSpecialty);
  router["delete"]("".concat(_routeName.RouteName.ADMIN, "/specialty/:id"), _token.verifyToken, _specialtyAdmin["default"].deleteSpecialty);
  router.post("".concat(_routeName.RouteName.ADMIN, "/clinic/add-new"), _token.verifyToken, upload.single("filename"), _clinicAdmin["default"].addNewClinic);
  // router.post(`${RouteName.ADMIN}/clinic/add-new`, verifyToken, , clinicAdminController.addNewClinic);
  router.get("".concat(_routeName.RouteName.ADMIN, "/clinic/:id"), _token.verifyToken, _clinicAdmin["default"].getClinic);
  router.post("".concat(_routeName.RouteName.ADMIN, "/clinic/filter"), _token.verifyToken, _clinicAdmin["default"].filterClinic);
  router.post("".concat(_routeName.RouteName.ADMIN, "/clinic/edit"), _token.verifyToken, upload.single("filename"), _clinicAdmin["default"].editClinic);
  router["delete"]("".concat(_routeName.RouteName.ADMIN, "/clinic/:id"), _token.verifyToken, _clinicAdmin["default"].deleteClinic);
  router.post("".concat(_routeName.RouteName.ADMIN, "/appointment/filter"), _token.verifyToken, _appointmentAdmin["default"].filterAppointment);
  router.post("".concat(_routeName.RouteName.ADMIN, "/appointment/edit"), _token.verifyToken, _appointmentAdmin["default"].editAppointment);
  router.post("".concat(_routeName.RouteName.ADMIN, "/appointment/status/edit"), _token.verifyToken, _appointmentAdmin["default"].editStatus);
  router.get("".concat(_routeName.RouteName.ADMIN, "/appointment/:id"), _token.verifyToken, _appointmentAdmin["default"].getAppointmentDetail);
  router["delete"]("".concat(_routeName.RouteName.ADMIN, "/appointment/:id"), _token.verifyToken, _appointmentAdmin["default"].deleteAppointment);

  // ---------------------  Patient  -------------------------
  router.post("".concat(_routeName.RouteName.PATIENT, "/register"), _authPatient["default"].register);
  router.post("".concat(_routeName.RouteName.PATIENT, "/login"), _authPatient["default"].login);
  router["delete"]("".concat(_routeName.RouteName.PATIENT, "/logout"), _token.verifyToken, _authPatient["default"].logout);
  router.post("".concat(_routeName.RouteName.PATIENT, "/token"), _authPatient["default"].getNewAccessToken);
  router.post("".concat(_routeName.RouteName.PATIENT, "/forgot-password"), _authPatient["default"].forgotPassword);
  router.post("".concat(_routeName.RouteName.PATIENT, "/verify-code"), _authPatient["default"].verifyCode);
  router.post("".concat(_routeName.RouteName.PATIENT, "/new-password"), _authPatient["default"].setNewPassword);
  router.get("".concat(_routeName.RouteName.PATIENT, "/province/all"), _patient["default"].getAllProvince);
  router.get("".concat(_routeName.RouteName.PATIENT, "/position/all"), _patient["default"].getAllPosition);
  router.get("".concat(_routeName.RouteName.PATIENT, "/clinic/all"), _clinicPatient["default"].getAllClinic);
  router.get("".concat(_routeName.RouteName.PATIENT, "/specialty/all"), _specialtyPatient["default"].getAllSpecialty);
  router.get("".concat(_routeName.RouteName.PATIENT, "/specialty/:id"), _specialtyPatient["default"].getSpecialty);
  router.get("".concat(_routeName.RouteName.PATIENT, "/patient/:id"), _token.verifyToken, _patient["default"].getPatient);
  router.put("".concat(_routeName.RouteName.PATIENT, "/patient/edit"), _token.verifyToken, _patient["default"].editAccount);
  router.put("".concat(_routeName.RouteName.PATIENT, "/patient/change-password"), _token.verifyToken, _patient["default"].changePassword);
  router.post("".concat(_routeName.RouteName.PATIENT, "/doctor/featured/filter"), _doctorPatient["default"].filterFeaturedDoctor);
  router.post("".concat(_routeName.RouteName.PATIENT, "/doctor/filter"), _doctorPatient["default"].filterDoctor);
  router.get("".concat(_routeName.RouteName.PATIENT, "/doctor/:id"), _doctorPatient["default"].getDoctor);
  router.get("".concat(_routeName.RouteName.PATIENT, "/doctor/relate/:id"), _doctorPatient["default"].getRelateDoctor);
  router.post("".concat(_routeName.RouteName.PATIENT, "/clinic/filter"), _clinicPatient["default"].filterClinic);
  router.get("".concat(_routeName.RouteName.PATIENT, "/clinic/:id"), _clinicPatient["default"].getClinic);
  router.get("".concat(_routeName.RouteName.PATIENT, "/clinic/getByProvince/:provinceKey"), _clinicPatient["default"].getClinicByProvince);
  router.post("".concat(_routeName.RouteName.PATIENT, "/specialty/filter"), _specialtyPatient["default"].filterSpecialty);
  router.post("".concat(_routeName.RouteName.PATIENT, "/booking"), _token.verifyToken, _appointmentPatient["default"].booking);
  router.post("".concat(_routeName.RouteName.PATIENT, "/verify-email"), _appointmentPatient["default"].verifyEmail);
  router.post("".concat(_routeName.RouteName.PATIENT, "/booking-direct"), _token.verifyToken, _appointmentPatient["default"].bookingDirect);
  router["delete"]("".concat(_routeName.RouteName.PATIENT, "/booking/delete/:id"), _token.verifyToken, _appointmentPatient["default"].deleteBooking);
  router.get("".concat(_routeName.RouteName.PATIENT, "/history/:id"), _token.verifyToken, _appointmentPatient["default"].getHistoryPatient);

  //------------------------------------ Doctor --------------------------------
  router.post("".concat(_routeName.RouteName.DOCTOR, "/register"), _authDoctor["default"].register);
  router.post("".concat(_routeName.RouteName.DOCTOR, "/login"), _authDoctor["default"].login);
  router.post("".concat(_routeName.RouteName.DOCTOR, "/token"), _authDoctor["default"].getNewAccessToken);
  router["delete"]("".concat(_routeName.RouteName.DOCTOR, "/logout"), _token.verifyToken, _authDoctor["default"].logout);
  router.post("".concat(_routeName.RouteName.DOCTOR, "/change-password"), _token.verifyToken, _doctor["default"].changePasswordDoctor);
  router.get("".concat(_routeName.RouteName.DOCTOR, "/doctor/:id"), _token.verifyToken, _doctor["default"].getDetail);
  router.put("".concat(_routeName.RouteName.DOCTOR, "/doctor/edit"), _token.verifyToken, upload.single("filename"), _doctor["default"].editDoctor);
  router.post("".concat(_routeName.RouteName.DOCTOR, "/schedule/by-date"), _token.verifyToken, _scheduleDoctor["default"].getScheduleByDate);
  router.get("".concat(_routeName.RouteName.DOCTOR, "/schedule/all"), _scheduleDoctor["default"].getAllScheduleCode);
  router.post("".concat(_routeName.RouteName.DOCTOR, "/schedule/create"), _token.verifyToken, _scheduleDoctor["default"].createSchedule);
  router.post("".concat(_routeName.RouteName.DOCTOR, "/appointment/filter"), _token.verifyToken, _appointmentDoctor["default"].filterAppointment);
  router.post("".concat(_routeName.RouteName.DOCTOR, "/appointment/edit"), _token.verifyToken, upload.single("filename"), _appointmentDoctor["default"].editAppointment);
  return app.use("/", router);
};
module.exports = initWebRoutes;