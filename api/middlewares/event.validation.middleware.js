const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const logger = reqlib("/utils/winston");
const { nextWithVars } = reqlib("utils");
const { generateType } = reqlib("utils/types");
const TemplateModel = reqlib("models/TemplateModel");
const { templateNameValidation } = reqlib("utils/joiValidator");

exports.pass = (req, res, next) => {
  console.log("EVENT MIDDLEWARE Allowing req to pass through me....");
  next();
};

exports.passIfTemplateNameIsNew = asyncHandler(async (req, res, next) => {
  const { tenantId } = req.locals;
  const { error } = templateNameValidation.validate(req.body);
  if (error)
    throw createError(400, "Template name is not provided", error.details);
  const template = await TemplateModel.useDbAndGenerateQuery(
    tenantId
  ).findByName(req.body.templateName);
  if (template.length)
    throw createError(400, "Template name is already in use");
  return next();
});

exports.passIfTemplateHasValidInput = (req, res, next) => {
  let { merge_tags } = req.body;
  const { parsedTemplate } = req.locals;
  if (!parsedTemplate) {
    throw createError(400, "No template was provided");
  }
  let { doesTemplateHaveVars } = parsedTemplate;
  let mergeTagsMap = [];
  if (merge_tags) {
    logger.debug("Merge tags are present");
    mergeTagsMap = new Map(Object.entries(merge_tags));
  }
  if (!doesTemplateHaveVars) {
    return nextWithVars(req, next, {
      mergeTagsMap,
    });
  }
  if (!merge_tags) {
    logger.error("No merge tags are provided for the template");
    throw createError(
      400,
      "Template has variables but no variables were provided to the template"
    );
  }

  mergeTagsMap.forEach(generateType);

  if (!parsedTemplate.doesMatchWithInputVars(mergeTagsMap)) {
    let templateErrors = parsedTemplate.errors.map((error, index) => {
      return { [`Error_${index + 1}`]: error };
    });
    throw createError(400, templateErrors);
  }
  return nextWithVars(req, next, { mergeTagsMap });
};
