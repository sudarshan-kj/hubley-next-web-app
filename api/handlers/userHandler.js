const logger = reqlib("/utils/winston");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { createOkResponse } = reqlib("utils/response");
const UserModel = reqlib("/models/UserModel");
const { PathParams, QueryParams } = reqlib("config");

/**
 * Return template data
 * *Handler to enrich data from middleware and return
 * @param  {} (req,res)
 */
// exports.returnWithTemplateAndMergeTagsData = asyncHandler((req, res) => {
//   const { parsedTemplate, mergeTagsMap } = req.locals;
//   const response = {
//     data: parsedTemplate.template,
//     templateVars: parsedTemplate.getTemplateVarsObjectFromMap(),
//     mergeTagsVars: Object.fromEntries(mergeTagsMap),
//   };
//   return createOkResponse(res, "Valid template", response);
// });

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

exports.createUser = asyncHandler(async (req, res) => {
  const { templateName: name } = req.body;
  const { parsedTemplate, tenantId } = req.locals;
  let toSaveUser = {
    name,
    content: { ...parsedTemplate },
    isStatic: !parsedTemplate.doesTemplateHaveVars,
    tenantId,
  };
  let savedTemplate;
  try {
    savedTemplate = await UserModel.insert(toSavetemplate);
  } catch (e) {
    if (e.errors && e.errors.name)
      throw createError(500, e.errors.name.message);
    throw createError(500, e);
  }
  return createOkResponse(res, "Created user ::", savedTemplate);
});

/**
 * *Handler to delete template
 * @param  {} async(req,res)
 */

exports.deleteUser = asyncHandler(async (req, res) => {
  //will receive a valid object id from the middleware
  const userIdToDelete = req.params[PathParams.USER_ID];
  const { userId: userIdWhoIsDeleting } = req.locals;
  const response = await Usermodel.deleteUser(userIdToDelete);
  let responseMessage = `No template with id: ${templateId} found`;
  if (response)
    responseMessage = `Successfully deleted user with id: ${userIdToDelete}`;
  return createOkResponse(res, responseMessage, response);
});

/**
 * *Handler to UPDATE existing template
 * @param  {} async(req,res)
 */

exports.updateUser = asyncHandler(async (req, res) => {
  //will receive a valid object id from the middleware
  const userId = req.params[PathParams.USER_ID];
  const { userData } = req.body;
  const toUpdateUser = userData;
  const userObject = await UserModel.updateUser(userId, toUpdateUser);
  let responseMessage = `No User with id: ${userId} found`;
  if (userObject)
    responseMessage = `Successfully updated user with id: ${userId}`;
  return createOkResponse(res, responseMessage, userObject);
});

/**
 * *Handler to UPDATE existing template
 * @param  {} async(req,res)
 */

exports.getUser = asyncHandler(async (req, res) => {
  //will receive a valid object id from the middleware
  const userId = req.params[PathParams.USER_ID];
  const userObject = await UserModel.findById(userId);
  let responseMessage = `No user with id: ${userId} found`;
  if (templateObject) responseMessage = "Fetched user successfully";
  return createOkResponse(res, responseMessage, userObject);
});

/**
 * *Handler to UPDATE existing template
 * @param  {} async(req,res)
 */
// exports.getTemplateByName = asyncHandler(async (req, res) => {
//   //will receive a valid object id from the middleware
//   const templateId = req.params[PathParams.EVENT_ID];
//   const templateObject = await TemplateModel.findById(templateId);
//   let responseMessage = `No template with id: ${templateId} found`;
//   if (templateObject) responseMessage = "Fetched template successfully";
//   return createOkResponse(res, responseMessage, templateObject);
// });

exports.listUsers = asyncHandler(async (req, res) => {
  const page = Number(req.query[QueryParams.PAGE]);
  const show = Number(req.query[QueryParams.SHOW]);
  const users = await UserModel.listUsers(show, page);
  return createOkResponse(res, "Successfully fetched", users, {
    count: users.length,
  });
});
