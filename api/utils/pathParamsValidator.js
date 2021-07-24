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

class ValidateTemplateIdPathParam extends ValidatePathParam {
  constructor(pathParam) {
    super(pathParam, PathParams.TEMPLATE_ID);
  }

  validate() {
    let templateId = this.pathParamValue;
    if (!isValidObjectId(templateId)) {
      throw createError(400, `Invalid template id: ${templateId}`);
    }
  }
}

exports.ValidateTemplateIdPathParam = ValidateTemplateIdPathParam;
