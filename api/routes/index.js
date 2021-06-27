const emailServiceRouter = require("./emailServiceRouter");
const textServiceRouter = require("./textServiceRouter");
const templateServiceRouter = require("./templateServiceRouter");

/*This module is a wrapper to all the routers */
module.exports = {
  emailServiceRouter,
  textServiceRouter,
  templateServiceRouter,
};
