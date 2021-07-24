const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const logger = reqlib("/utils/winston");
const { nextWithVars } = reqlib("utils");
const { eventInputValidatorSchema } = reqlib("utils/joiValidator");

exports.pass = (req, res, next) => {
  console.log("EVENT MIDDLEWARE Allowing req to pass through me....");
  next();
};

exports.validateInputFields = (req, res, next) => {
  const { error } = eventInputValidatorSchema.validate(req.body);
  if (error) throw createError(400, "Check input fields", error.details);
  next();
};
