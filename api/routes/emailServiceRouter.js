const emailServiceRouter = require("express").Router();
const emailHandler = reqlib("/handlers/emailHandler");
const EmailValidationMiddleware = reqlib(
  "middlewares/email.validation.middleware"
);

/*
HTTP GET Requests
*/

emailServiceRouter.get("/health", emailHandler.health);

/*
HTTP POST Requests
*/

emailServiceRouter.post("/send", [
  EmailValidationMiddleware.readMultiFormPartData,
  EmailValidationMiddleware.validateEmailInputFields,
  EmailValidationMiddleware.determineToUseTemplateOrRequestBody,
  emailHandler.sendEmailMessage,
]);

/* Requests end here */
module.exports = emailServiceRouter;
