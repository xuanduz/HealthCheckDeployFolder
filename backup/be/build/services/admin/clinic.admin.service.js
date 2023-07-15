"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _models = _interopRequireDefault(require("../../models"));
var _firebaseFunction = require("../../utils/firebase-function");
var _label = require("../../utils/labels/label");
var _pagingData = require("../../utils/pagingData");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _require = require("sequelize"),
  Op = _require.Op;
var addNewClinic = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(clinicData, file) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
              var checkExisted, imageUrl, newClinic, specialtyData, listClinicSpecialty;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return _models["default"].Clinic.findOne({
                      where: {
                        email: clinicData.email
                      },
                      raw: true
                    });
                  case 3:
                    checkExisted = _context.sent;
                    if (!checkExisted) {
                      _context.next = 8;
                      break;
                    }
                    resolve({
                      message: _label.Label.EXISTED_EMAIL,
                      success: false
                    });
                    _context.next = 25;
                    break;
                  case 8:
                    if (!file) {
                      _context.next = 14;
                      break;
                    }
                    _context.next = 11;
                    return (0, _firebaseFunction.uploadImage)(file);
                  case 11:
                    _context.t0 = _context.sent;
                    _context.next = 15;
                    break;
                  case 14:
                    _context.t0 = "";
                  case 15:
                    imageUrl = _context.t0;
                    _context.next = 18;
                    return _models["default"].Clinic.create({
                      email: clinicData.email,
                      name: clinicData.name,
                      address: clinicData.address,
                      provinceKey: clinicData.provinceKey,
                      image: imageUrl,
                      descriptionHTML: clinicData.descriptionHTML,
                      describe: clinicData.describe
                    });
                  case 18:
                    newClinic = _context.sent;
                    specialtyData = clinicData.specialtyData ? JSON.parse(clinicData.specialtyData) : [];
                    listClinicSpecialty = [];
                    if (specialtyData.length) {
                      listClinicSpecialty = specialtyData.map(function (spec) {
                        return {
                          clinicId: newClinic.id,
                          specialtyId: spec.id
                        };
                      });
                    }
                    _context.next = 24;
                    return _models["default"].Clinic_Specialty.bulkCreate(listClinicSpecialty);
                  case 24:
                    resolve({
                      message: _label.Label.CREATE_CLINIC_SUCCESS,
                      success: true,
                      data: newClinic
                    });
                  case 25:
                    _context.next = 31;
                    break;
                  case 27:
                    _context.prev = 27;
                    _context.t1 = _context["catch"](0);
                    console.log("err", _context.t1);
                    reject();
                  case 31:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[0, 27]]);
            }));
            return function (_x3, _x4) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function addNewClinic(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getClinic = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(clinicId) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
              var clinicData, result;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.prev = 0;
                    _context3.next = 3;
                    return _models["default"].Clinic.findOne({
                      where: {
                        id: clinicId
                      },
                      include: [{
                        model: _models["default"].Specialty,
                        as: "specialtyData",
                        attributes: {
                          exclude: ["createdAt", "updatedAt"]
                        }
                      }]
                    });
                  case 3:
                    clinicData = _context3.sent;
                    result = {};
                    if (!clinicData) {
                      result = {
                        message: _label.Label.NOT_EXISTED_CLINIC,
                        success: false
                      };
                    } else {
                      result = {
                        message: _label.Label.SUCCESS,
                        success: true,
                        data: clinicData
                      };
                    }
                    resolve(result);
                    _context3.next = 13;
                    break;
                  case 9:
                    _context3.prev = 9;
                    _context3.t0 = _context3["catch"](0);
                    console.log("err", _context3.t0);
                    reject();
                  case 13:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3, null, [[0, 9]]);
            }));
            return function (_x6, _x7) {
              return _ref4.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getClinic(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
var filterClinic = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(filter) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
              var pageNum, pageSize, clinicName, provinceKey, _yield$db$Clinic$find, count, rows;
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.prev = 0;
                    pageNum = filter.pageNum, pageSize = filter.pageSize, clinicName = filter.clinicName, provinceKey = filter.provinceKey;
                    _context5.next = 4;
                    return _models["default"].Clinic.findAndCountAll({
                      offset: (+pageNum - 1) * +pageSize,
                      limit: +pageSize,
                      distinct: true,
                      where: {
                        name: _defineProperty({}, Op.like, "%".concat(clinicName ? clinicName : "", "%"))
                      },
                      include: [{
                        model: _models["default"].Code,
                        as: "provinceData",
                        required: provinceKey ? true : false,
                        where: {
                          key: _defineProperty({}, Op.like, "%".concat(provinceKey ? provinceKey : "", "%"))
                        },
                        attributes: {
                          exclude: ["createdAt", "updatedAt"]
                        }
                      }]
                      // nest: true,
                    });
                  case 4:
                    _yield$db$Clinic$find = _context5.sent;
                    count = _yield$db$Clinic$find.count;
                    rows = _yield$db$Clinic$find.rows;
                    resolve({
                      message: _label.Label.SUCCESS,
                      success: true,
                      data: rows,
                      pagination: {
                        pageNum: (0, _pagingData.getPageAmount)(count, pageSize) < pageNum ? pageNum - 1 : pageNum,
                        pageSize: pageSize,
                        pageAmount: (0, _pagingData.getPageAmount)(count, pageSize),
                        records: count
                      }
                    });
                    _context5.next = 14;
                    break;
                  case 10:
                    _context5.prev = 10;
                    _context5.t0 = _context5["catch"](0);
                    console.log("err", _context5.t0);
                    reject();
                  case 14:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5, null, [[0, 10]]);
            }));
            return function (_x9, _x10) {
              return _ref6.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function filterClinic(_x8) {
    return _ref5.apply(this, arguments);
  };
}();
var editClinic = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(clinicInfo, file) {
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
              var clinic, specialtyData, listClinicSpecialty, imageUrl, clinicUpdate, oldUrl, newClinic;
              return _regeneratorRuntime().wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.prev = 0;
                    _context7.next = 3;
                    return _models["default"].Clinic.findOne({
                      where: {
                        id: clinicInfo.id
                      }
                    });
                  case 3:
                    clinic = _context7.sent;
                    if (!clinic) {
                      resolve({
                        message: _label.Label.NOT_EXISTED_CLINIC,
                        success: false
                      });
                    }
                    specialtyData = clinicInfo.specialtyData ? JSON.parse(clinicInfo.specialtyData) : [];
                    listClinicSpecialty = [];
                    if (specialtyData.length) {
                      listClinicSpecialty = specialtyData.map(function (spec) {
                        return {
                          clinicId: clinicInfo.id,
                          specialtyId: spec.id
                        };
                      });
                    }
                    _context7.next = 10;
                    return _models["default"].Clinic_Specialty.destroy({
                      where: {
                        clinicId: clinicInfo.id
                      }
                    });
                  case 10:
                    if (!file) {
                      _context7.next = 16;
                      break;
                    }
                    _context7.next = 13;
                    return (0, _firebaseFunction.uploadImage)(file);
                  case 13:
                    _context7.t0 = _context7.sent;
                    _context7.next = 17;
                    break;
                  case 16:
                    _context7.t0 = "";
                  case 17:
                    imageUrl = _context7.t0;
                    _context7.next = 20;
                    return _models["default"].Clinic_Specialty.bulkCreate(listClinicSpecialty);
                  case 20:
                    clinicUpdate = {
                      name: clinicInfo.name,
                      email: clinicInfo.email,
                      provinceKey: clinicInfo.provinceKey,
                      address: clinicInfo.address,
                      image: imageUrl,
                      descriptionHTML: clinicInfo.descriptionHTML,
                      describe: clinicInfo.describe
                    };
                    if (!imageUrl) {
                      _context7.next = 26;
                      break;
                    }
                    oldUrl = clinic.dataValues.image;
                    if (!oldUrl) {
                      _context7.next = 26;
                      break;
                    }
                    _context7.next = 26;
                    return (0, _firebaseFunction.deleteFile)(oldUrl);
                  case 26:
                    _context7.next = 28;
                    return clinic.update(clinicUpdate);
                  case 28:
                    newClinic = _context7.sent;
                    resolve({
                      message: _label.Label.UPDATE_SUCCESS,
                      success: true,
                      data: newClinic.dataValues
                    });
                    _context7.next = 36;
                    break;
                  case 32:
                    _context7.prev = 32;
                    _context7.t1 = _context7["catch"](0);
                    console.log("err", _context7.t1);
                    reject();
                  case 36:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7, null, [[0, 32]]);
            }));
            return function (_x13, _x14) {
              return _ref8.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function editClinic(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
var deleteClinic = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(clinicId) {
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          return _context10.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
              var clinic, oldUrl;
              return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.prev = 0;
                    _context9.next = 3;
                    return _models["default"].Clinic.findOne({
                      where: {
                        id: clinicId
                      }
                    });
                  case 3:
                    clinic = _context9.sent;
                    oldUrl = clinic.dataValues.image;
                    if (!oldUrl) {
                      _context9.next = 8;
                      break;
                    }
                    _context9.next = 8;
                    return (0, _firebaseFunction.deleteFile)(oldUrl);
                  case 8:
                    _context9.next = 10;
                    return clinic.destroy();
                  case 10:
                    resolve({
                      message: _label.Label.DELETE_SUCCESS,
                      success: true
                    });
                    _context9.next = 17;
                    break;
                  case 13:
                    _context9.prev = 13;
                    _context9.t0 = _context9["catch"](0);
                    console.log("err", _context9.t0);
                    reject();
                  case 17:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9, null, [[0, 13]]);
            }));
            return function (_x16, _x17) {
              return _ref10.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function deleteClinic(_x15) {
    return _ref9.apply(this, arguments);
  };
}();
module.exports = {
  addNewClinic: addNewClinic,
  getClinic: getClinic,
  filterClinic: filterClinic,
  editClinic: editClinic,
  deleteClinic: deleteClinic
};