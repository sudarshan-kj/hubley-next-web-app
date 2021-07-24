const logger = reqlib("/utils/winston");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const TemplateParser = reqlib("lib/template/templateParser");
const { emailInputValidatorSchema } = reqlib("utils/joiValidator");
const { isValidObjectId, attachVars } = reqlib("utils");

exports.pass = (req, res, next) => {
  console.log("USERRR MIDDLEWARE Allowing req to pass through me....");
  next();
};
