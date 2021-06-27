const logger = reqlib("utils/winston");
const createError = require("http-errors");
const asyncHandler = require("express-async-handler");
const EmailLogModel = require("../models/EmailLogModel");

exports.sendEmailMessage = asyncHandler(async (req, res) => {
  try {
    const logCount = await EmailLogModel.getLogCount();
    console.log("Logcount is", logCount);
    return res.status(200).send({ count: logCount });
  } catch (e) {
    throw new createError(500, "Something went WRONG");
  }
});

exports.health = asyncHandler(async (req, res) => {
  return res.status(200).send({ message: "all great!" });
});
