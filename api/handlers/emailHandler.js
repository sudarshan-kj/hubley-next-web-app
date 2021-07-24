const logger = reqlib("utils/winston");
const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const EmailLogModel = reqlib("models/EmailLogModel");
const { createOkResponse } = reqlib("utils/response");
const EmailActions = reqlib("lib/email/emailActions");

exports.sendEmailMessage = asyncHandler(async (req, res) => {
  try {
    if (req.locals && req.locals.templateId) {
      //a template has been used
      const { parsedTemplate, mergeTagsMap, templateId } = req.locals;
      const newBody = parsedTemplate.replaceVariablesWith(mergeTagsMap);
      req.body.body = newBody;
      req.body.templateId = templateId;
    }
    const emailActions = new EmailActions();
    try {
      emailActions.compose();
      await emailActions.send();
    } catch (e) {
      throw createError(500, e);
    }
    const emailLog = await EmailLogModel.insert(req.body);
    return createOkResponse(res, "Email message sent");
  } catch (e) {
    throw createError(500, "Something went wrong", e);
  }
});

exports.health = asyncHandler(async (req, res) => {
  return res.status(200).send({ message: "all great!" });
});
