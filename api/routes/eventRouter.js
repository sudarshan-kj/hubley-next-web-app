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
const { ValidateEventIdPathParam } = reqlib("utils/pathParamsValidator");

/*
HTTP GET Requests
*/

eventRouter.get("/health", eventHandler.health);

eventRouter.get("/list", [
  UtilsMiddleware.validateQueryParams([
    ValidatePageQueryParam,
    ValidateShowQueryParam,
  ]),
  eventHandler.listEvents,
]);

eventRouter.get(`/:${PathParams.EVENT_ID}`, [
  UtilsMiddleware.validatePathParams([ValidateEventIdPathParam]),
  eventHandler.getEvent,
]);
/*
HTTP POST Requests
*/

eventRouter.post("/create", [
  EventValidationMiddleware.validateInputFields,
  EventValidationMiddleware.getFirebaseUserIdData,
  eventHandler.createEvent,
]);

/*
HTTP PUT REQUESTS
*/

eventRouter.put(`/:${PathParams.EVENT_ID}`, [eventHandler.updateEvent]);

/*
HTTP DELETE REQUESTS
*/

eventRouter.delete(`/:${PathParams.EVENT_ID}`, [
  UtilsMiddleware.validatePathParams([ValidateEventIdPathParam]),
  EventValidationMiddleware.getFirebaseUserIdData,
  eventHandler.deleteEvent,
]);

/* Requests end here */
module.exports = eventRouter;
