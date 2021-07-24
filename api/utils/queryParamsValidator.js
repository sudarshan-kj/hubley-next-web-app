const logger = reqlib("utils/winston");
const { QueryParams } = reqlib("config");
const createError = require("http-errors");
const { isValidNumber } = reqlib("utils");

/**
 * This is meant to act like an abstract class. Do not instantiate this class directly.
 */
class ValidateQueryParam {
  constructor(queryParam, queryParamName) {
    this.queryParam = queryParam;
    this.queryParamName = queryParamName || null;
    this.queryParamValue = queryParam[queryParamName];
  }

  validate() {
    throw new Error(
      `Could not find an implementation of 'validate()' method in your class: ${this.constructor.name} `
    );
  }

  initValidation() {
    logger.debug(`Validating query param "${this.queryParamName}"`);
    this.validate();
  }
}

class ValidatePageQueryParam extends ValidateQueryParam {
  constructor(queryParam) {
    super(queryParam, QueryParams.PAGE);
  }

  validate() {
    let page = this.queryParamValue;
    if (!isValidNumber(page)) {
      throw createError(400, "Invalid / missing 'page' value");
    }
    if (page > 50) {
      throw createError(400, "Enter 'page' value <= 50");
    }
  }
}

class ValidateShowQueryParam extends ValidateQueryParam {
  constructor(queryParam) {
    super(queryParam, QueryParams.SHOW);
  }

  validate() {
    let show = this.queryParamValue;
    if (!isValidNumber(show)) {
      throw createError(400, "Invalid / missing 'show' value");
    }
    if (show > 100) {
      throw createError(400, "Enter 'show' value <= 100");
    }
  }
}

exports.ValidatePageQueryParam = ValidatePageQueryParam;
exports.ValidateShowQueryParam = ValidateShowQueryParam;
