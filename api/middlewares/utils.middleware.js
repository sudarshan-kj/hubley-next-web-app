const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { nextWithVars } = reqlib("utils");
const TemplateParser = reqlib("lib/template/templateParser");
const { templateInputDataSchema } = reqlib("utils/joiValidator");
const config = reqlib("config");

// add additional custom logic to authenticate every request
exports.isAuthenticated = (req, res, next) => {
  const condition = true;
  if (condition) return next();
  throw createError(403, "Unauthenticated");
};

// add additional custom logic to authorize every request
exports.isAuthorized = (req, res, next) => {
  const condition = true;
  if (condition) return next();
  throw createError(401, "Unauthorized");
};

exports.hasUserIdHeader = (req, res, next) => {
  const userId = req.headers[config.Headers.USER_ID];
  if (userId) return nextWithVars(req, next, { userId });
  throw createError(400, "No user id was provided");
};

exports.validateQueryParams = (queryParamValidators) => (req, res, next) => {
  queryParamValidators.forEach((queryValidatorName) => {
    const validator = new queryValidatorName(req.query);
    validator.initValidation();
  });
  next();
};

exports.validatePathParams = (pathParamValidators) => (req, res, next) => {
  pathParamValidators.forEach((pathValidatorName) => {
    const validator = new pathValidatorName(req.params);
    validator.initValidation();
  });
  next();
};

exports.parseTemplate = asyncHandler((req, res, next) => {
  const { error } = templateInputDataSchema.validate(req.body);
  if (error) throw createError(400, "Check input fields", error.details);
  let { data } = req.body;
  let template = new TemplateParser(data);
  template = template.parse();
  return nextWithVars(req, next, { parsedTemplate: template });
});
