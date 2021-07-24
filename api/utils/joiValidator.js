const Joi = require("joi");

exports.eventInputValidatorSchema = Joi.object({
  eventName: Joi.string().required(),
  eventDescription: Joi.string().required(),
  eventType: Joi.string().valid("live", "onDemand").required(),
  eventImages: Joi.array().items(Joi.string().required()).required(),
  eventCreatedBy: Joi.object({
    userName: Joi.string().required(),
    userId: Joi.string().required(),
  }),
});

exports.userInputValidatorSchema = Joi.object({
  userName: Joi.string().required(),
  userDescription: Joi.string(),
  userSocialMediaLinks: Joi.object({
    twitter: Joi.string(),
    facebook: Joi.string(),
    instagram: Joi.string(),
  }),
});
