const logger = reqlib("utils/winston");
const createError = require("http-errors");
const asyncHandler = require("express-async-handler");

exports.sendTextMessage = asyncHandler(async (req, res) => {
  return res.status(200).send({message: "From Text Handler"});
});

exports.health = asyncHandler(async (req, res)=> {
    return res.status(200).send({message: "all great!"})
  })