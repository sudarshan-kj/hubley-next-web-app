const { mongoose, useDb } = reqlib("services/mongoose.service");
const beautifyUnique = require("mongoose-beautiful-unique-validation");

let { Schema } = mongoose;
const opts = {
  autoIndex: true,
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

let templateSchema = new Schema(
  {
    name: {
      type: String,
      unique: "A duplicate name already exists ({VALUE})",
    },
    content: { type: Object },
    isStatic: { type: Boolean },
    tenantId: {
      type: String,
      default: "kredx-default-tenant-id",
    },
  },
  opts
);
templateSchema.plugin(beautifyUnique);
templateSchema.index({ name: 1 }, { unique: true });

const useDbAndGenerateQuery = (databaseName) => {
  let db = useDb(databaseName);
  let Template = db.model("Template", templateSchema);
  return {
    insert(templateData) {
      let templateRecord = new Template(templateData);
      return templateRecord.save();
    },
    findById(templateId) {
      return Template.findById(templateId);
    },
    findByName(templateName) {
      return Template.find({ name: templateName });
    },

    getTemplateCount() {
      return Template.countDocuments();
    },

    deleteTemplate(templateId) {
      return Template.findByIdAndDelete(templateId);
    },

    updateTemplate(templateId, newValue) {
      return Template.findByIdAndUpdate(templateId, newValue, {
        new: true,
      });
    },

    listTemplates(show, page) {
      //this is done so that we don't show the page after this page
      page = page - 1;
      let skip = show;
      if (show < 10) {
        skip = 10;
      }
      return new Promise((resolve, reject) => {
        Template.find()
          .limit(show)
          .skip(skip * page)
          .exec((err, templates) => {
            if (err) reject(err);
            else resolve(templates);
          });
      });
    },
  };
};

exports.useDbAndGenerateQuery = useDbAndGenerateQuery;

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
