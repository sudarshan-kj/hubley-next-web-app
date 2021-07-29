const mongoose = require("../services/mongoose.service").mongoose;
const beautifyUnique = require("mongoose-beautiful-unique-validation");
require("mongoose-type-email");

let { Schema } = mongoose;
const opts = {
  toJSON: {
    virtuals: true, //this adds the "id" field
    versionKey: false,
    transform: function (doc, ret) {
      delete ret._id; //since id is added, this _id is not required
      delete ret.createdAt;
      delete ret.updatedAt;
    },
  },
  timestamps: true,
  //setDefaultsOnInsert: true, // not really sure if this field is required, since I checked that it works fine even without it.
};

let eventSchema = new Schema(
  {
    eventName: {
      type: String,
    },
    eventType: {
      type: String,
    },
    eventDescription: {
      type: String,
    },
    eventImages: {
      type: Array,
    },
    eventDateTime: { type: Date }, //use default https://pbs.twimg.com/profile_images/1132191777195085824/KbxIQUxJ_400x400.png if needed
    eventDuration: {
      type: Number,
    },
    eventCost: {
      type: String,
    },
    eventRegistrations: {
      type: Object,
    },
    eventCreatedBy: {
      userName: String,
      userId: String,
    },
  },
  opts
);
eventSchema.plugin(beautifyUnique);

//quoteSchema.index({ quote: 1 }, { unique: true });

let Event = mongoose.model("Event", eventSchema);

exports.insert = (eventData) => {
  let eventRecord = new Event(eventData);
  return eventRecord.save();
};

exports.insertMany = (eventsArray) => {
  return Event.insertMany(eventsArray, { ordered: false });
};

exports.getLogCount = () => {
  return Event.countDocuments();
};

exports.list = (show, page) => {
  page = page - 1;
  let skip = show;
  if (show < 100) {
    skip = 100;
  }
  return new Promise((resolve, reject) => {
    Event.find()
      .limit(show)
      .skip(skip * page)
      .exec((err, events) => {
        if (err) reject(err);
        else resolve(events);
      });
  });
};

exports.findById = (eventId) => {
  return Event.findById(eventId);
};

exports.update = (eventId, newValues) => {
  return Event.findByIdAndUpdate(eventId, newValues, { new: true });
};

exports.delete = (eventId) => {
  return Event.findByIdAndDelete(eventId);
};

// exports.findLatest = () => {
//   return Quote.findOne().sort({ publishedDate: -1 });
// };

// exports.findByDate = (value) => {
//   const plus2Hours = new Date(value);
//   plus2Hours.setHours(plus2Hours.getHours() + 2);
//   //this gives us the quote for the date specified in 'value'
//   return Quote.findOne({ publishedDate: { $gte: value, $lt: plus2Hours } });
// };

// exports.findByCategory = (value) => {
//   return Quote.findOne({ category: value });
// };

// exports.findById = (memberId) => {
//   return Member.findById({ _id: memberId });
// };
