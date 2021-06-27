const logger = reqlib("/utils/winston");
const asyncHandler = require("express-async-handler");

exports.validateTemplate = asyncHandler((req, res) => {
  return res.status(200).send({ reqBody: req.body.data });
});
