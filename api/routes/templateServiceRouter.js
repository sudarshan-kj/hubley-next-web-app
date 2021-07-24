const templateRouter = require("express").Router();
const { PathParams } = reqlib("config");
const templateHandler = reqlib("handlers/templateHandler");
const TemplateValidationMiddleware = reqlib(
  "middlewares/template.validation.middleware"
);
const UtilsMiddleware = reqlib("middlewares/utils.middleware");
const { ValidatePageQueryParam, ValidateShowQueryParam } = reqlib(
  "utils/queryParamsValidator"
);
const { ValidateTemplateIdPathParam } = reqlib("utils/pathParamsValidator");

/*
HTTP GET Requests
*/
templateRouter.get("/list", [
  UtilsMiddleware.validateQueryParams([
    ValidatePageQueryParam,
    ValidateShowQueryParam,
  ]),
  templateHandler.listTemplates,
]);

templateRouter.get(`/:${PathParams.TEMPLATE_ID}`, [
  UtilsMiddleware.validatePathParams([ValidateTemplateIdPathParam]),
  templateHandler.getTemplate,
]);

/*
HTTP POST REQUESTS
*/

templateRouter.post("/validate/name", [
  TemplateValidationMiddleware.passIfTemplateNameIsNew,
  templateHandler.returnOk,
]);

templateRouter.post("/validate", [
  UtilsMiddleware.parseTemplate,
  TemplateValidationMiddleware.passIfTemplateHasValidInput,
  templateHandler.returnWithTemplateAndMergeTagsData,
]);

templateRouter.post("/generate", [
  UtilsMiddleware.parseTemplate,
  TemplateValidationMiddleware.passIfTemplateHasValidInput,
  templateHandler.generateMessageFromTemplate,
]);

templateRouter.post("/save", [
  UtilsMiddleware.parseTemplate,
  templateHandler.saveTemplate,
]);

/*
HTTP PUT REQUESTS
*/

templateRouter.put(`/:${PathParams.TEMPLATE_ID}`, [
  UtilsMiddleware.parseTemplate,
  templateHandler.updateTemplate,
]);

/*
HTTP DELETE REQUESTS
*/

templateRouter.delete(`/:${PathParams.TEMPLATE_ID}`, [
  UtilsMiddleware.validatePathParams([ValidateTemplateIdPathParam]),
  templateHandler.deleteTemplate,
]);

module.exports = templateRouter;
