const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const logger = reqlib("/utils/winston");
const { nextWithVars } = reqlib("utils");
const UserModel = reqlib("models/UserModel");
const { eventInputValidatorSchema } = reqlib("utils/joiValidator");

exports.pass = (req, res, next) => {
  console.log("EVENT MIDDLEWARE Allowing req to pass through me....");
  return next();
};

exports.getFirebaseUserIdData = asyncHandler(async (req, res, next) => {
  const { userFirebaseId } = req.locals;
  try {
    const userData = await UserModel.findByFirebaseId(userFirebaseId);
    return nextWithVars(req, next, { userData });
  } catch (e) {
    throw createError(500, e);
  }
});

exports.validateInputFields = (req, res, next) => {
  const { error } = eventInputValidatorSchema.validate(req.body);
  if (error) throw createError(400, "Check input fields", error.details);
  return next();
};
