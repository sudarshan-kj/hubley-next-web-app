const emailHandler = reqlib("/handlers/email");
const emailServiceRouter = require("express").Router();

/*
HTTP GET Requests
*/

emailServiceRouter.get("/health", emailHandler.health);

/*
HTTP POST Requests
*/

emailServiceRouter.post("/send", emailHandler.sendEmailMessage);

/* Requests end here */
module.exports = emailServiceRouter;
