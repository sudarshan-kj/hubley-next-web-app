const logger = reqlib("utils/winston");

RegExp.escape = function (string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};

/**
 * This class is responsible for generating a message using the string content upon which the variables are to be replaced
 */
class MessageGenerator {
  constructor(stringContent, variableToReplace, data) {
    /*
    data: {
        type: "var_type"
        metaData: {
            value: "var_value",
            delimiter: "delimiter_value"
        }
    }
    */
    this.stringContent = stringContent;
    this.variableToReplace = variableToReplace;
    this.data = data;
  }

  static MATCH_EXPRESSIONS = {
    VAR_START: "|*",
    VAR_END: "*|",
    ARRAY_START: "[",
    ARRAY_END: "]",
  };

  static DELIMITER_TYPES = {
    return_char: "R",
    tab_char: "T",
    space_char: "S",
    default: ",",
  };

  _getVarMatchString() {
    const { VAR_START, VAR_END } = MessageGenerator.MATCH_EXPRESSIONS;
    return `${VAR_START}${this.variableToReplace}${VAR_END}`;
  }

  _getArrayMatchString() {
    const { VAR_START, VAR_END, ARRAY_START, ARRAY_END } =
      MessageGenerator.MATCH_EXPRESSIONS;
    return `${VAR_START}${ARRAY_START}${this.variableToReplace}${ARRAY_END}${VAR_END}`;
  }

  _getRegEx() {
    if (this.data.type === "array")
      return new RegExp(RegExp.escape(this._getArrayMatchString()), "g");
    else return new RegExp(RegExp.escape(this._getVarMatchString()), "g");
  }

  generate() {
    switch (this.data.type) {
      case "array":
        let delimiter = this.data.metaData.delimiter;
        if (!delimiter) {
          delimiter = MessageGenerator.DELIMITER_TYPES.default;
          logger.warn(
            `*** No delimiter specified for variable '${this.variableToReplace}' => Using default delimiter '${delimiter}' ***`
          );
        }
        switch (delimiter) {
          case MessageGenerator.DELIMITER_TYPES.return_char:
            delimiter = "\n";
            break;
          case MessageGenerator.DELIMITER_TYPES.tab_char:
            delimiter = `    `;
            break;
          case MessageGenerator.DELIMITER_TYPES.space_char:
            delimiter = ` `;
            break;
        }
        let arrayString = this.data.metaData.value.join(`${delimiter} `);

        if (delimiter === "\n") {
          arrayString = `\n ${arrayString}\n`;
        }
        let replaced = this.stringContent.replace(
          this._getRegEx(),
          arrayString
        );
        return replaced;
      case "string":
        return this.stringContent.replace(
          this._getRegEx(),
          this.data.metaData.value
        );
      default:
        throw new Error(`Invalid type: ${this.data.type}`);
    }
  }
}

module.exports = MessageGenerator;
