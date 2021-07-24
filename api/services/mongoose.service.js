const mongoose = require("mongoose");
const config = reqlib("config/db.config");
const logger = reqlib("utils/winston");

let mongoDBUrl = config.MONGO_DB_URL;
const options = {
  poolSize: 10,
  bufferMaxEntries: 0,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const connect = () => {
  logger.debug("Setting up MongoDB connection");
  mongoose
    .connect(mongoDBUrl, options)
    .then(() => logger.info("MongoDB is successfully connected"))
    .catch((err) => {
      logger.error(`Connection to '${mongoDBUrl}' unsuccessful`);
      process.exit(1);
    });
};

connect();

exports.mongoose = mongoose;
