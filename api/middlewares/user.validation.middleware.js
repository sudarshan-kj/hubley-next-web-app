const logger = reqlib("/utils/winston");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const TemplateParser = reqlib("lib/template/templateParser");
const { emailInputValidatorSchema } = reqlib("utils/joiValidator");
const { isValidObjectId, attachVars } = reqlib("utils");
const { Headers } = reqlib("config");
const TemplateValidationMiddleware = require("./template.validation.middleware");
const TemplateModel = reqlib("models/TemplateModel");
const multer = require("multer");
var upload = multer({ dest: "uploads/" });

exports.readMultiFormPartData = upload.array("attachments", 5);

exports.pass = (req, res, next) => {
  console.log("USERRR MIDDLEWARE Allowing req to pass through me....");
  next();
};

exports.validateEmailInputFields = (req, res, next) => {
  // convert form data to json object, then pass it on
  const jsonBody = {
    from: req.body.from,
    to: {
      recipient: JSON.parse(req.body.to),
      cc: JSON.parse(req.body.cc),
      bcc: JSON.parse(req.body.bcc),
    },
    body: req.body.body,
    subject: req.body.subject,
    merge_tags: JSON.parse(req.body.merge_tags),
  };
  req.body = jsonBody;
  const { error } = emailInputValidatorSchema.validate(req.body);
  if (error) {
    throw createError(400, "Check input fields", error.details);
  }
  next();
};

/**
 * The following middleware will determine if the message from template or request body is to be sent
 */
exports.determineToUseTemplateOrRequestBody = asyncHandler(
  async (req, res, next) => {
    const { tenantId } = req.locals;
    const templateId = req.headers[Headers.TEMPLATE_ID];
    if (templateId === undefined) return next();
    if (isValidObjectId(templateId)) {
      const templateProperties = await TemplateModel.useDbAndGenerateQuery(
        tenantId
      ).findById(templateId);
      if (templateProperties) {
        /* we can use the template.parse() method to populate all the required fields, but
        its all the more efficient to avoid parsing the template since we already have
        parsed data in our db. So we only reconstruct the template parser object from the data.*/

        let { template, templateVarsMap, doesTemplateHaveVars } =
          templateProperties.content;
        templateVarsMap = new Map(Object.entries(templateVarsMap));
        const templateObject = new TemplateParser(
          template,
          templateVarsMap,
          doesTemplateHaveVars
        );
        attachVars(req, { parsedTemplate: templateObject, templateId });
        // templateProperties.content.template
        TemplateValidationMiddleware.passIfTemplateHasValidInput(
          req,
          res,
          next
        );
      } else throw createError(400, `No template with id: ${templateId} found`);
    } else throw createError(400, "Invalid template id");
  }
);
