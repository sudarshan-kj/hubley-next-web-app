const logger = reqlib("/utils/winston");
const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { createOkResponse } = reqlib("utils/response");
const EventModel = reqlib("/models/EventModel");
const UserModel = reqlib("/models/UserModel");
const { PathParams, QueryParams } = reqlib("config");

/**
 * Return event data
 * *Handler to return a OK response
 * @param  {} (req,res)
 */
exports.health = (req, res) => {
  return createOkResponse(res, "ok");
};

/**
 * *Handler to persist events
 * @param  {} async(req,res)
 */

exports.createEvent = asyncHandler(async (req, res) => {
  let toSaveEvent = req.body;
  let { userData } = req.locals;
  if (!userData) throw createError(500, "User required to create an event");
  toSaveEvent.eventCreatedBy = userData.id;
  try {
    savedEvent = await EventModel.insert(toSaveEvent);
    savedUser = await UserModel.addToCreatedEvents(userData.id, {
      eventType: savedEvent.eventType,
      eventId: savedEvent._id,
    });
  } catch (e) {
    if (e.errors && e.errors.name)
      throw createError(500, e.errors.name.message);
    throw createError(500, e);
  }
  return createOkResponse(res, "Saved event", savedEvent);
});

/**
 * *Handler to delete event
 * @param  {} async(req,res)
 */

exports.deleteEvent = asyncHandler(async (req, res) => {
  //will receive a valid object id from the middleware
  const eventId = req.params[PathParams.EVENT_ID];
  let { userData } = req.locals;

  const response = await EventModel.delete(eventId);
  if (userData && response) {
    await UserModel.deleteFromCreatedEvents(userData.id, {
      eventType: response.eventType,
      eventId: eventId,
    });
  }
  let responseMessage = `No event with id: ${eventId} found`;
  if (response)
    responseMessage = `Successfully deleted event with id: ${eventId}`;
  return createOkResponse(res, responseMessage, response);
});

/**
 * *Handler to UPDATE existing event
 * @param  {} async(req,res)
 */

exports.updateEvent = asyncHandler(async (req, res) => {
  //will receive a valid object id from the middleware
  const eventId = req.params[PathParams.EVENT_ID];
  const toSaveEvent = req.body;
  const eventObject = await EventModel.update(eventId, toSaveEvent);
  let responseMessage = `No event with id: ${eventId} found`;
  if (eventObject)
    responseMessage = `Successfully updated event with id: ${eventId}`;
  return createOkResponse(res, responseMessage, eventObject);
});

/**
 * *Handler to GET existing event
 *
 * @param  {} async(req,res)
 */

exports.getEvent = asyncHandler(async (req, res) => {
  //will receive a valid object id from the middleware
  const eventId = req.params[PathParams.EVENT_ID];
  const eventObject = await EventModel.findById(eventId).populate(
    "eventCreatedBy"
  );
  let responseMessage = `No event with id: ${eventId} found`;
  if (eventObject) responseMessage = "Fetched event successfully";
  return createOkResponse(res, responseMessage, eventObject);
});

/**
 * *Handler to LIST existing events
 * @param  {} async(req,res)
 */

exports.listEvents = asyncHandler(async (req, res) => {
  const page = Number(req.query[QueryParams.PAGE]);
  const show = Number(req.query[QueryParams.SHOW]);
  const events = await EventModel.list(show, page);
  return createOkResponse(res, "Successfully fetched", events, {
    count: events.length,
  });
});
