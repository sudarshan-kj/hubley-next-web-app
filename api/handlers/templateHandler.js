const logger = reqlib("/utils/winston");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { createOkResponse } = reqlib("utils/response");
const TemplateModel = reqlib("/models/TemplateModel");
const { PathParams, QueryParams } = reqlib("config");

/** Template Message Generator
 * @param  {} (req,res)
 */
exports.generateMessageFromTemplate = asyncHandler((req, res) => {
  //req.locals contains a valid template object and merge tags map
  const { parsedTemplate, mergeTagsMap } = req.locals;
  const message = parsedTemplate.replaceVariablesWith(mergeTagsMap);
  return createOkResponse(res, "Generated message from template", {
    message,
  });
});

/**
 * Return template data
 * *Handler to enrich data from middleware and return
 * @param  {} (req,res)
 */
exports.returnWithTemplateAndMergeTagsData = asyncHandler((req, res) => {
  const { parsedTemplate, mergeTagsMap } = req.locals;
  const response = {
    data: parsedTemplate.template,
    templateVars: parsedTemplate.getTemplateVarsObjectFromMap(),
    mergeTagsVars: Object.fromEntries(mergeTagsMap),
  };
  return createOkResponse(res, "Valid template", response);
});

/**
 * Return template data
 * *Handler to return a OK response in case of a valid template name
 * @param  {} (req,res)
 */
exports.returnOk = (req, res) => {
  return createOkResponse(res, "Valid template name");
};

/**
 * *Handler to persist templates
 * @param  {} async(req,res)
 */

exports.saveTemplate = asyncHandler(async (req, res) => {
  const { templateName: name } = req.body;
  const { parsedTemplate, tenantId } = req.locals;
  let toSavetemplate = {
    name,
    content: { ...parsedTemplate },
    isStatic: !parsedTemplate.doesTemplateHaveVars,
    tenantId,
  };
  let savedTemplateWithParsedMapData;
  try {
    const savedTemplate = await TemplateModel.useDbAndGenerateQuery(
      tenantId
    ).insert(toSavetemplate);
    savedTemplateWithParsedMapData = Object.assign(savedTemplate);
    // Template vars map cannot be showed via JSON. Hence it is important to convert the map to object before responding
    savedTemplateWithParsedMapData.content.templateVarsMap =
      parsedTemplate.getTemplateVarsObjectFromMap();
  } catch (e) {
    if (e.errors && e.errors.name)
      throw createError(500, e.errors.name.message);
    throw createError(500, e);
  }
  return createOkResponse(
    res,
    "Saved template to database",
    savedTemplateWithParsedMapData
  );
});

/**
 * *Handler to delete template
 * @param  {} async(req,res)
 */

exports.deleteTemplate = asyncHandler(async (req, res) => {
  //will receive a valid object id from the middleware
  const templateId = req.params[PathParams.TEMPLATE_ID];
  const { tenantId } = req.locals;
  const response = await TemplateModel.useDbAndGenerateQuery(
    tenantId
  ).deleteTemplate(templateId);
  let responseMessage = `No template with id: ${templateId} found`;
  if (response)
    responseMessage = `Successfully deleted template with id: ${templateId}`;
  return createOkResponse(res, responseMessage, response);
});

/**
 * *Handler to UPDATE existing template
 * @param  {} async(req,res)
 */

exports.updateTemplate = asyncHandler(async (req, res) => {
  //will receive a valid object id from the middleware
  const templateId = req.params[PathParams.TEMPLATE_ID];
  const { templateName: name } = req.body;
  const { parsedTemplate, tenantId } = req.locals;
  const toSavetemplate = {
    name,
    content: { ...parsedTemplate },
  };
  const templateObject = await TemplateModel.useDbAndGenerateQuery(
    tenantId
  ).updateTemplate(templateId, toSavetemplate);
  let responseMessage = `No template with id: ${templateId} found`;
  if (templateObject)
    responseMessage = `Successfully updated template with id: ${templateId}`;
  return createOkResponse(res, responseMessage, templateObject);
});

/**
 * *Handler to UPDATE existing template
 * @param  {} async(req,res)
 */

exports.getTemplate = asyncHandler(async (req, res) => {
  //will receive a valid object id from the middleware
  const templateId = req.params[PathParams.TEMPLATE_ID];
  const { tenantId } = req.locals;
  const templateObject = await TemplateModel.useDbAndGenerateQuery(
    tenantId
  ).findById(templateId);
  let responseMessage = `No template with id: ${templateId} found`;
  if (templateObject) responseMessage = "Fetched template successfully";
  return createOkResponse(res, responseMessage, templateObject);
});

/**
 * *Handler to UPDATE existing template
 * @param  {} async(req,res)
 */
// exports.getTemplateByName = asyncHandler(async (req, res) => {
//   //will receive a valid object id from the middleware
//   const templateId = req.params[PathParams.TEMPLATE_ID];
//   const templateObject = await TemplateModel.findById(templateId);
//   let responseMessage = `No template with id: ${templateId} found`;
//   if (templateObject) responseMessage = "Fetched template successfully";
//   return createOkResponse(res, responseMessage, templateObject);
// });

exports.listTemplates = asyncHandler(async (req, res) => {
  const page = Number(req.query[QueryParams.PAGE]);
  const show = Number(req.query[QueryParams.SHOW]);
  const { tenantId } = req.locals;
  const templates = await TemplateModel.useDbAndGenerateQuery(
    tenantId
  ).listTemplates(show, page);
  return createOkResponse(res, "Successfully fetched", templates, {
    count: templates.length,
  });
});
