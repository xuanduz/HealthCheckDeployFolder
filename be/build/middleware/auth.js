"use strict";

var jwt = required("jsonwebtoken");
var verifyToken = function verifyToken(req, res, next) {
  var authHeader = req.header("Authorization");
  var token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    var decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.id = decoded.id;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
};
module.exports = verifyToken;