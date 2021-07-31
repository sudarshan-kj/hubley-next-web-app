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

let userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide a user name"],
      maxlength: [30, "Name cannot exceed 30 characters"],
    },
    userEmail: {
      type: String,
      required: [true, "Please provide user's email"],
      maxlength: [80, "Email cannot exceed 80 characters"],
    },
    userDescription: {
      type: String,
    },
    userImage: {
      type: String,
    },
    userFirebaseId: {
      type: String,
    },
    userRegisteredEvents: {
      live: [Schema.Types.ObjectId],
      onDemand: [Schema.Types.ObjectId],
    },
    userCreatedEvents: {
      live: [Schema.Types.ObjectId],
      onDemand: [Schema.Types.ObjectId],
    },
    userSavedEvents: {
      live: [Schema.Types.ObjectId],
      onDemand: [Schema.Types.ObjectId],
    },
    userSocialMediaLinks: {
      twitter: String,
      facebook: String,
      instagram: String,
    },
  },
  opts
);
userSchema.plugin(beautifyUnique);

userSchema.index({ userEmail: 1 }, { unique: true });
userSchema.index({ userFirebaseId: 1 }, { unique: true });

let User = mongoose.model("User", userSchema);

exports.insert = (userData) => {
  let userDataRecord = new User(userData);
  return userDataRecord.save();
};

exports.getUserCount = () => {
  return User.countDocuments();
};

exports.findById = (userId) => {
  return User.findById(userId);
};

exports.addToCreatedEvents = (userId, eventData) => {
  const { eventType, eventId } = eventData;
  return User.findByIdAndUpdate(userId, {
    $addToSet: { [`userCreatedEvents.${eventType}`]: eventId },
  });
};

exports.deleteFromCreatedEvents = (userId, eventData) => {
  const { eventType, eventId } = eventData;
  return User.findByIdAndUpdate(userId, {
    $pull: { [`userCreatedEvents.${eventType}`]: eventId },
  });
  //each of these to control which bucket should the event be put in.
};

exports.addToSavedEvents = (eventId, eventType) => {};

exports.addToRegisteredEvents = (eventId, eventType) => {};

exports.findByFirebaseId = (firebaseId) => {
  return User.findOne({ userFirebaseId: firebaseId });
};

exports.list = (show, page) => {
  page = page - 1;
  let skip = show;
  if (show < 100) {
    skip = 100;
  }
  return new Promise((resolve, reject) => {
    User.find()
      .limit(show)
      .skip(skip * page)
      .exec((err, users) => {
        if (err) reject(err);
        else resolve(users);
      });
  });
};

exports.delete = (userId) => {
  return User.findByIdAndDelete(userId);
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

// exports.update = (memberId, newValues) => {
//   return Quote.findByIdAndUpdate({ _id: memberId }, newValues);
// };

// exports.list = (perPage, page) => {
//   return new Promise((resolve, reject) => {
//     Quote.find()
//       .limit(perPage)
//       .skip(perPage * page)
//       .exec((err, quotes) => {
//         if (err) reject(err);
//         else resolve(quotes);
//       });
//   });
// };
