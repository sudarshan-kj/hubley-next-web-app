const logger = reqlib("utils/winston");
const VariableType = reqlib("utils/types");
const { Types } = reqlib("utils/types");
const MessageGenerator = reqlib("lib/template/messageGenerator");

function enrichMapData(map, customVariableName, type, delimiter) {
  if (type.startsWith("[") && type.endsWith("]")) {
    map.set(customVariableName, new VariableType(Types.array, { delimiter }));
  } else {
    map.set(customVariableName, new VariableType(Types.string, {}));
  }
  return map;
}

function _extractTemplateVars(anyMatch) {
  let varsMap = new Map();
  do {
    let { customVariableName, type, delimiter } = anyMatch.groups;
    varsMap = enrichMapData(varsMap, customVariableName, type, delimiter);
  } while ((anyMatch = TemplateParser.regEx.exec(this.template)) !== null);
  return varsMap;
}

class TemplateParser {
  static regEx =
    /(?<=\|\*)(?<type>\[?(?<customVariableName>[a-zA-Z_]+\d*)\]?)\{?(?<delimiter>.?)\}?(?=\*\|)/gm;

  /* 1. (?<=\|\*) - Lookbehind assertion.
    2. (?<array>\[?(?<customVariable>[a-zA-Z_]+\d*)\]?) - Match any variable name starting only with  case sensitive alphabet or underscore, which can contain then contain any number of
        alphabets, numbers or underscores..
    3. \{?(?<delimiter>.?)\}? The delimiter data to apply to an array. Although delimiter will be recognized even when not used with arrays.
    4. (?=\*\|) - Lookahead assertion.
 */

  constructor(template, templateVarsMap, doesTemplateHaveVars, errors) {
    this.template = template;
    this.templateVarsMap = templateVarsMap || new Map();
    this.errors = errors || [];
    this.doesTemplateHaveVars = doesTemplateHaveVars || false;
  }

  parse() {
    let anyMatch = TemplateParser.regEx.exec(this.template);
    if (anyMatch) {
      logger.info("One or more variables are defined in the template");
      this.doesTemplateHaveVars = true;
      this.templateVarsMap = _extractTemplateVars.call(this, anyMatch);
      Object.freeze(this.templateVarsMap);
      logger.debug("Frozen template vars map");
    } else {
      logger.debug("No variables are defined in the template");
      this.doesTemplateHaveVars = false;
    }
    return this;
  }

  /**
   * The following method adds errors to the errors[] array, if any.
   * @param inputVarsMap
   * @returns  Boolean
   */
  doesMatchWithInputVars(inputVarsMap) {
    this.templateVarsMap.forEach((templateValue, templateKey) => {
      let inputVarsValue = inputVarsMap.get(templateKey);
      let errorMsg;
      if (!inputVarsValue) {
        errorMsg = `Variable: '${templateKey}' not provided`;
        this.errors.push(errorMsg);
        return;
      }
      if (inputVarsValue.type !== templateValue.type) {
        errorMsg = `Expected type '${templateValue.type}' for variable: '${templateKey}', but instead got '${inputVarsValue.type}'`;
        this.errors.push(errorMsg);
        return;
      }
    });
    return this.errors.length === 0;
  }

  getTemplateVarsObjectFromMap() {
    return Object.fromEntries(this.templateVarsMap);
  }

  _removeDelimiterPlaceHolder() {
    let removeDelimiterRegex = /(?<=\|\*\[.*\])\{.*\}(?=\*\|)/g;
    return this.template.replace(removeDelimiterRegex, "");
  }

  replaceVariablesWith(mergeTagsMap) {
    let message = this._removeDelimiterPlaceHolder();
    this.templateVarsMap.forEach((templateValue, templateKey) => {
      let mergeTag = mergeTagsMap.get(templateKey);
      if (mergeTag) {
        if (mergeTag.type !== templateValue.type) {
          logger.error(`Type mismatch for template variable: ${templateKey}`);
          return;
        }
        let mergeTypeWithData = new VariableType(mergeTag.type, {
          ...mergeTag.metaData,
          ...templateValue.metaData,
        });
        message = new MessageGenerator(
          message,
          templateKey,
          mergeTypeWithData
        ).generate();
      } else {
        logger.error(`${templateKey} value not provided`);
        return;
      }
    });
    return message;
  }
}

module.exports = TemplateParser;
