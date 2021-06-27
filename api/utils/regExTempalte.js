const e = require("express");
const logger = require("./winston");

class Template {
  constructor(template) {
    this.template = template;
    this.createTemplate();
  }

  createTemplate() {}
  doesTemplateHaveVars() {}
  isTemplateValid() {}
  extractVars() {}
}

/* 1. (?<=\|\*) - Lookbehind assertion.
    2. (?<array>\[?(?<customVariable>[a-zA-Z_]+\d*)\]?) - Match any variable name starting only with  case sensitive alphabet or underscore, which can contain then contain any number of
        alphabets, numbers or underscores..
    3. \{?(?<delimiter>.?)\}? The delimiter data to apply to an array. Although delimiter will be recognized even when not used with arrays.
    4. (?=\*\|) - Lookahead assertion.
 */
const regEx =
  /(?<=\|\*)(?<array>\[?(?<customVariable>[a-zA-Z_]+\d*)\]?)\{?(?<delimiter>.?)\}?(?=\*\|)/gm;

function scanData(data) {
  let anyMatch = regEx.exec(data);
  if (anyMatch) {
    logger.info(
      "One or more variables are defined in the template. Marking the template as WITH_MERGE_TAGS"
    );
    do {
      console.log(`Hello, ${anyMatch.groups.customVariable} \n`);
      console.log(
        `Is array?: ${
          anyMatch.groups.array.startsWith("[") &&
          anyMatch.groups.array.endsWith("]")
        }`
      );
      console.log(`Delimiter?: ${anyMatch.groups.delimiter}`);
    } while ((anyMatch = regexpNames.exec(data)) !== null);
  } else {
    logger.info(
      "No variables are defined in the template. Marking the template as PLAIN_TEXT"
    );
  }
}

function extractTemplateVars() {
  // return all types of vars and their corresponding types
}

function extractProvidedVarsWithValues() {
  //check number of provided vars
  //if provided vars 0, return
  // return map of provided vars with value
}

function doTemplateVarsMatchProvidedVars() {
  //at first check if the count are same.
  // then check if an array is provided for a field where array is defined, or a string is provided for a field where string is defined.
  return true;
  //return false;
}

function validateProvidedVarsValue(providedVarsMap) {
  //pass through if validation succeedes
  //error out if validation fails.
}

function replaceVariablesWithValues() {
  let personList2 = `Hello $firstname$, This is to inform $firstname$`;
  let varName = "firstname";
  let regExGen = `[$]${varName}[$]`;
  let regExxxx = new RegExp(regExGen, "g");
  let replaced = personList2.replace(regExxxx, "VALUE FROM VARIABLE");
}
