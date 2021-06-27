const mongoose = require("../services/mongoose.service").mongoose;
const beautifyUnique = require("mongoose-beautiful-unique-validation");

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

let emailLogRecordSchema = new Schema(
  {
    from: {
      type: String,
    },
    to: { type: String, default: "WELLBEING" },
    body: { type: String, default: "" }, //use default https://pbs.twimg.com/profile_images/1132191777195085824/KbxIQUxJ_400x400.png if needed
    subject: {
      type: Date,
      unique: "A quote for this date already exists ({VALUE})",
    },
    test: {
      type: String,
      unique: "A duplicate twitter link already exists ({VALUE})",
    },
  },
  opts
);
emailLogRecordSchema.plugin(beautifyUnique);

//quoteSchema.index({ quote: 1 }, { unique: true });

let EmailLogRecord = mongoose.model("EmailLogRecord", emailLogRecordSchema);

exports.insert = (emailLogData) => {
  let emailLogRecord = new EmailLogRecord(emailLogData);
  return emailLogRecord.save();
};

exports.insertMany = (emailLogsArray) => {
  return EmailLogRecord.insertMany(emailLogsArray, { ordered: false });
};

exports.getLogCount = () => {
  return EmailLogRecord.countDocuments();
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
