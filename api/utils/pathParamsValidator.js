const logger = reqlib("utils/winston");
const { PathParams } = reqlib("config");
const createError = require("http-errors");
const { isValidObjectId } = reqlib("utils");

/**
 * This is meant to act like an abstract class. Do not instantiate this class directly.
 */
class ValidatePathParam {
  constructor(pathParam, pathParamName) {
    this.pathParam = pathParam;
    this.pathParamName = pathParamName || null;
    this.pathParamValue = pathParam[pathParamName];
  }

  validate() {
    throw new Error(
      `Could not find an implementation of 'validate()' method in your class: ${this.constructor.name} `
    );
  }

  initValidation() {
    logger.debug(`Validating path param "${this.pathParamName}"`);
    this.validate();
  }
}

class ValidateEventIdPathParam extends ValidatePathParam {
  constructor(pathParam) {
    super(pathParam, PathParams.EVENT_ID);
  }

  validate() {
    let eventId = this.pathParamValue;
    if (!isValidObjectId(eventId)) {
      throw createError(400, `Invalid event id: ${eventId}`);
    }
  }
}

class ValidateUserIdPathParam extends ValidatePathParam {
  constructor(pathParam) {
    super(pathParam, PathParams.USER_ID);
  }

  validate() {
    let userId = this.pathParamValue;
    if (!isValidObjectId(userId)) {
      throw createError(400, `Invalid user id: ${userId}`);
    }
  }
}

exports.ValidateUserIdPathParam = ValidateUserIdPathParam;
exports.ValidateEventIdPathParam = ValidateEventIdPathParam;
