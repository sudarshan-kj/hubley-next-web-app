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
    },
    userDescription: {
      type: String,
    },
    userImage: {
      type: String,
    },
    userEvents: {
      type: Object,
    },
    userSocialMediaLinks: {
      type: Object,
    },
  },
  opts
);
emailLogRecordSchema.plugin(beautifyUnique);

//quoteSchema.index({ quote: 1 }, { unique: true });

let User = mongoose.model("User", userSchema);

exports.insert = (userData) => {
  let userDataRecord = new User(userData);
  return userDataRecord.save();
};

exports.getUserCount = () => {
  return User.countDocuments();
};

exports.findById = (userId) => {
  return User.findById({ _id: userId });
};

// exports.delete = (quoteId) => {
//   return new Promise((resolve, reject) => {
//     Quote.deleteMany({ _id: quoteId }).exec((err, deletedQuote) => {
//       if (err) reject(err);
//       resolve(deletedQuote);
//     });
//   });
// };

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
