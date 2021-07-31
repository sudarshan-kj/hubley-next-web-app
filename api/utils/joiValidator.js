const Joi = require("joi");

exports.eventInputValidatorSchema = Joi.object({
  eventName: Joi.string().required(),
  eventDescription: Joi.string().required(),
  eventType: Joi.string().valid("live", "onDemand").required(),
  eventImages: Joi.array().items(Joi.string().required()).required(),
  eventPlatform: Joi.string().valid("zoom", "Google Meet", "Vimeo").required(),
  eventLink: Joi.string(),
});

exports.createUserInputValidatorSchema = Joi.object({
  userName: Joi.string().required(),
  userEmail: Joi.string().email().required(),
  userFirebaseId: Joi.string(), //allowed but not mandatory
});

exports.updateUserInputValidatorSchema = Joi.object({
  userName: Joi.string().required(),
  userDescription: Joi.string(),
  userSocialMediaLinks: Joi.object({
    twitter: Joi.string(),
    facebook: Joi.string(),
    instagram: Joi.string(),
  }),
});
