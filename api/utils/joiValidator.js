const Joi = require("joi");

exports.emailInputValidatorSchema = Joi.object({
  from: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  to: Joi.object({
    recipient: Joi.array()
      .items(
        Joi.string()
          .email({
            minDomainSegments: 2,
          })
          .required()
      )
      .required(),
    cc: Joi.array().items(
      Joi.string().email({
        minDomainSegments: 2,
      })
    ),
    bcc: Joi.array().items(
      Joi.string().email({
        minDomainSegments: 2,
      })
    ),
  }).required(),
  body: Joi.string().min(0).max(500).required(),
  subject: Joi.string().min(0).max(500).required(),
  merge_tags: Joi.object(),
});

exports.templateInputDataSchema = Joi.object({
  data: Joi.string().required(),
  merge_tags: Joi.object(),
  templateName: Joi.string().required(),
});

exports.templateNameValidation = Joi.object({
  templateName: Joi.string().required(),
});
