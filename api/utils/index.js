const ObjectId = require("mongoose").Types.ObjectId;

exports.isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};

exports.attachVars = (req, object) => {
  req.locals = { ...req.locals, ...object };
};

exports.nextWithVars = (req, next, object) => {
  req.locals = { ...req.locals, ...object };
  next();
};

exports.isValidNumber = (value) => {
  let numberValue = parseInt(value);
  if (numberValue) return true;
  return false;
};
