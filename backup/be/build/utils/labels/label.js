"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Label = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Label = _defineProperty({
  CREATE_ACCOUNT_SUCCESS: "Tạo tài khoản thành công",
  CREATE_CLINIC_SUCCESS: "Tạo cơ sở y tế thành công",
  CREATE_SPECIALTY_SUCCESS: "Tạo chuyên khoa thành công",
  EXISTED_ACCOUNT: "Tài khoản đã tồn tại",
  EXISTED_EMAIL: "Email đã tồn tại",
  NOT_EXISTED_ACCOUNT: "Tài khoản không tồn tại",
  NOT_EXISTED_CLINIC: "Cơ sở y tế không tồn tại",
  NOT_EXISTED_SPECIALTY: "Chuyên khoa không tồn tại",
  NOT_EXISTED_APPOINTMENT: "Lịch hẹn không tồn tại",
  WRONG_LOGIN: "Sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại",
  UPDATE_SUCCESS: "Cập nhật thành công",
  DELETE_POST_SUCCESS: "Xoá bài viết thành công",
  SUCCESS: "Thành công",
  DELETE_SUCCESS: "Xoá thành công",
  WRONG_PASSWORD: "Sai mật khẩu",
  WRONG_OLD_PASSWORD: "Sai mật khẩu cũ",
  WRONG_PASSWORD_OR_EMAIL: "Sai email hoặc mật khẩu",
  CHANGE_PASSWORD_SUCCESS: "Đổi mật khẩu thành công",
  LOGIN_SUCCESS: "Đăng nhập thành công",
  BOOKING_SUCCESS: "Đặt lịch hẹn thành công, bạn có thể vào phần lịch sử để kiểm tra trạng thái!",
  BOOKING_FAIL: "Đặt lịch hẹn không thành công",
  BOOKING_FAIL_NOT_EXIST_DOCTOR: "Đặt lịch hẹn không thành công do bác sĩ bạn chọn không còn tồn tại, vui lòng chọn bác sĩ khác",
  NOT_EXIST_APPOINTMENT: "Không tồn tại lịch hẹn",
  BOOKING_DUPLICATE: "Bạn đã đặt lịch trước đó rồi, vui lòng kiểm tra trong phần Lịch sử khám bệnh để kiểm tra",
  VERIFY_EMAIL_SUCCESS: "Xác nhận đặt lịch thành công !",
  VERIFIED_EMAIL: "Bạn đã xác nhận đặt lịch rồi !",
  CHECK_EMAIL: "Hãy kiểm tra email của bạn và nhập mã vào bên dưới",
  WRONG_CODE: "Nhập mã sai, vui lòng kiểm tra lại !",
  SUCCESS_CODE: "Nhập mã đúng, hãy nhập mật khẩu mới !"
}, "UPDATE_SUCCESS", "Cập nhật thành công !");
exports.Label = Label;