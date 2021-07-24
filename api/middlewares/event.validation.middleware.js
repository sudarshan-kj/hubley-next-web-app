const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const logger = reqlib("/utils/winston");
const { nextWithVars } = reqlib("utils");

exports.pass = (req, res, next) => {
  console.log("EVENT MIDDLEWARE Allowing req to pass through me....");
  next();
};
