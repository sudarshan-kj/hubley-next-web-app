const winston = require("winston");
const { format, transports, createLogger } = winston;
const path = require("path");
const envConfig = require("../config/env.config");
const consoleloggerLevel =
  process.env[envConfig.WINSTON_CONSOLE_LOGGER_LEVEL] || "debug";

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info) => {
    return `${info.timestamp} - ${info.level}:  [${info.label}]: ${
      info.message
    } ::=> ${JSON.stringify(info.metadata)}`;
  })
);

const fileFormat = format.combine(
  format.timestamp(),
  format.label({ label: path.basename(process.mainModule.filename) }),
  format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
  format.json()
);

const logger = createLogger({
  level: "info",
  defaultMeta: { service: "hubley-web-app" },
  format: fileFormat,
  transports: [
    new transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
      maxsize: 5242880, //5MB
    }),
    new transports.File({
      filename: path.join(__dirname, "../logs/activity.log"),
      maxsize: 5242880, //5MB
    }),
    new transports.File({
      filename: path.join(__dirname, "../logs/debug.log"),
      level: "debug",
      maxsize: 5242880, //5MB
    }),
    new transports.File({
      filename: path.join(__dirname, "../logs/http.log"),
      level: "http",
      maxsize: 5242880, //5MB
    }),
  ],
  exitOnError: false,
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      level: consoleloggerLevel,
      format: consoleFormat,
    })
  );
}

module.exports = logger;
