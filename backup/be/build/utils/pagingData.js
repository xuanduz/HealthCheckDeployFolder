"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryWithId = exports.getPageAmount = exports.getListDateNextWeek = exports.getListData = exports.getCodePassword = void 0;
var getPageAmount = function getPageAmount(length, pageSize) {
  return length > pageSize ? Math.floor(length / pageSize) + (length % pageSize == 0 ? 0 : 1) : 1;
};
exports.getPageAmount = getPageAmount;
var getListData = function getListData(listData, pageNum, pageSize) {
  return listData.length ? listData.slice((pageNum - 1) * pageSize, pageNum * pageSize) : [];
};
exports.getListData = getListData;
var getQueryWithId = function getQueryWithId(id) {
  return id ? {
    where: {
      id: id
    },
    required: true
  } : {
    required: false
  };
};

// Lấy lịch mai + 6 ngày nữa
exports.getQueryWithId = getQueryWithId;
var getListDateNextWeek = function getListDateNextWeek() {
  var d = new Date();
  var listDate = Array(7).fill(0).map(function (item, idx) {
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString("pt-br").split("/").join("-");
  });
  return listDate;
};
exports.getListDateNextWeek = getListDateNextWeek;
var getCodePassword = function getCodePassword(length) {
  var newCode = "";
  for (var i = 1; i <= Array(length).length; i++) {
    newCode += Math.floor(Math.random() * 9 + 1);
  }
  return newCode;
};
exports.getCodePassword = getCodePassword;