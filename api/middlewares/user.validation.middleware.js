const logger = reqlib("/utils/winston");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const TemplateParser = reqlib("lib/template/templateParser");
const { createUserInputValidatorSchema } = reqlib("utils/joiValidator");
const { isValidObjectId, attachVars } = reqlib("utils");

exports.pass = (req, res, next) => {
  console.log("USERRR MIDDLEWARE Allowing req to pass through me....");
  return next();
};

exports.validateCreateUserInput = (req, res, next) => {
  const { error } = createUserInputValidatorSchema.validate(req.body);
  if (error)
    throw createError(400, "Check create user input fields", error.details);
  return next();
};
