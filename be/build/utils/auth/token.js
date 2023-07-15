"use strict";

require("dotenv").config();
var jwt = require("jsonwebtoken");
var generateTokens = function generateTokens(payload) {
  var id = payload.id,
    email = payload.email;
  var accessToken = jwt.sign({
    id: id,
    email: email
  }, process.env.ACCESS_TOKEN, {
    expiresIn: "1d"
  });
  var refreshToken = jwt.sign({
    id: id,
    email: email
  }, process.env.REFRESH_TOKEN, {
    expiresIn: "5d"
  });
  return {
    accessToken: accessToken,
    refreshToken: refreshToken
  };
};
var verifyToken = function verifyToken(req, res, next) {
  var authHeader = req.header("Authorization");
  var token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN);
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401).json({
      message: "Unauthorized",
      success: false
    });
  }
};
var verifyRefreshToken = function verifyRefreshToken(refreshToken) {
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    return true;
  } catch (err) {
    return false;
  }
};
module.exports = {
  generateTokens: generateTokens,
  verifyToken: verifyToken,
  verifyRefreshToken: verifyRefreshToken
};