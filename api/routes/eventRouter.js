const eventRouter = require("express").Router();
const { PathParams } = reqlib("config");
const eventHandler = reqlib("/handlers/eventHandler");
const EventValidationMiddleware = reqlib(
  "middlewares/event.validation.middleware"
);
const UtilsMiddleware = reqlib("middlewares/utils.middleware");
const { ValidatePageQueryParam, ValidateShowQueryParam } = reqlib(
  "utils/queryParamsValidator"
);
const { ValidateUserIdPathParam } = reqlib("utils/pathParamsValidator");

/*
HTTP GET Requests
*/

eventRouter.get("/health", eventHandler.health);

/*
HTTP POST Requests
*/

eventRouter.post("/create", [
  EventValidationMiddleware.pass,
  eventHandler.createUser,
]);

eventRouter.get("/list", [
  UtilsMiddleware.validateQueryParams([
    ValidatePageQueryParam,
    ValidateShowQueryParam,
  ]),
  eventHandler.listEvents,
]);

eventRouter.get(`/:${PathParams.USER_ID}`, [
  UtilsMiddleware.validatePathParams([ValidateUserIdPathParam]),
  eventHandler.getUser,
]);

/*
HTTP POST REQUESTS
*/

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
