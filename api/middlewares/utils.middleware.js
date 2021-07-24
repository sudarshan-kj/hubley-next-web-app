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

exports.hasTenantIdHeader = (req, res, next) => {
  const tenantId = req.headers[config.Headers.TENANT_ID];
  if (tenantId) return nextWithVars(req, next, { tenantId });
  throw createError(400, "No tenant id header was provided");
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
