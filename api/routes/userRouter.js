const userRouter = require("express").Router();
const { PathParams } = reqlib("config");
const userHandler = reqlib("/handlers/eventHandler");
const UserValidationMiddleware = reqlib(
  "middlewares/user.validation.middleware"
);
const UtilsMiddleware = reqlib("middlewares/utils.middleware");
const { ValidatePageQueryParam, ValidateShowQueryParam } = reqlib(
  "utils/queryParamsValidator"
);
const { ValidateUserIdPathParam } = reqlib("utils/pathParamsValidator");

/*
HTTP GET Requests
*/

userRouter.get("/health", userHandler.health);

/*
HTTP POST Requests
*/

userRouter.post("/create", [
  UserValidationMiddleware.pass,
  userHandler.createUser,
]);

userRouter.get("/list", [
  UtilsMiddleware.validateQueryParams([
    ValidatePageQueryParam,
    ValidateShowQueryParam,
  ]),
  userRouter.listEvents,
]);

userRouter.get(`/:${PathParams.USER_ID}`, [
  UtilsMiddleware.validatePathParams([ValidateUserIdPathParam]),
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

/* Requests end here */
module.exports = emailServiceRouter;

/* Requests end here */
module.exports = emailServiceRouter;
