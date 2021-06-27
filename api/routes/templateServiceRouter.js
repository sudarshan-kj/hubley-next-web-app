const templateRouter = require("express").Router();
const templateHandler = reqlib("/handlers/templateHandler");

/*
HTTP GET Requests
*/

/*
HTTP POST REQUESTS
*/

templateRouter.post("/validate", [templateHandler.validateTemplate]);

module.exports = templateRouter;
