const logger = reqlib("/utils/winston");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { createOkResponse } = reqlib("utils/response");
const UserModel = reqlib("models/UserModel");
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
exports.health = (req, res) => {
  return createOkResponse(res, "ok");
};

/**
 * *Handler to persist templates
 * @param  {} async(req,res)
 */

exports.createUser = asyncHandler(async (req, res) => {
  let toSaveUser = req.body;
  let savedUser;
  try {
    savedUser = await UserModel.insert(toSaveUser);
  } catch (e) {
    if (e.errors && e.errors.name)
      throw createError(500, e.errors.name.message);
    throw createError(500, e);
  }
  return createOkResponse(res, "Created user ::", savedUser);
});

/**
 * *Handler to delete template
 * @param  {} async(req,res)
 */

exports.deleteUser = asyncHandler(async (req, res) => {
  //will receive a valid object id from the middleware
  const userIdToDelete = req.params[PathParams.USER_ID];
  const response = await UserModel.delete(userIdToDelete);
  let responseMessage = `No user with id: ${userIdToDelete} found`;
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
  if (userObject) responseMessage = "Fetched user successfully";
  return createOkResponse(res, responseMessage, userObject);
});

/**
 * *Handler to UPDATE existing template
 * @param  {} async(req,res)
 */
// exports.getTemplateByName = asyncHandler(async (req, res) => {
//   //will receive a valid object id from the middleware
//   const templateId = req.params[PathParams.USER_ID];
//   const templateObject = await UserModel.findById(userId);
//   let responseMessage = `No template with id: ${templateId} found`;
//   if (templateObject) responseMessage = "Fetched template successfully";
//   return createOkResponse(res, responseMessage, templateObject);
// });

exports.listUsers = asyncHandler(async (req, res) => {
  const page = Number(req.query[QueryParams.PAGE]);
  const show = Number(req.query[QueryParams.SHOW]);
  const users = await UserModel.list(show, page);
  return createOkResponse(res, "Successfully fetched", users, {
    count: users.length,
  });
});
