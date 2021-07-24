global.reqlib = require("app-root-path").require;
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8900;
reqlib("services/init.service");
const cors = require("cors");
const app = express();
const createError = require("http-errors");
const morgan = require("morgan");
const logger = reqlib("utils/winston");
const helmet = require("helmet");

const { isAuthenticated, isAuthorized } = reqlib(
  "middlewares/utils.middleware"
);
const { eventRouter } = reqlib("/routes");

/*USER COMMUNICATIONS MAIN MODULE*/

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.http(message),
    },
  })
);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.disable("x-powered-by");
const apiRouter = express.Router();
app.get("/ping", (_, res) =>
  res.status(200).send({
    message: "pong",
    debugLevel: process.env.WINSTON_CONSOLE_LOGGER_LEVEL,
  })
);

/*Custom api router for handling all api requests*/
app.use("/api", apiRouter);
apiRouter.use([isAuthenticated, isAuthorized]);
apiRouter.use("/event", eventRouter);

/* Handler for invalid path (404)*/
app.use((req, res, next) => {
  next(createError(404));
});

/* Custom ERROR Handler */
app.use((error, req, res, next) => {
  let errorStatus = error.status || 500;
  logger.error(
    `${errorStatus} - ${error.message} - ${req.originalUrl} - ${req.method}`,
    {
      errorStatus,
      errorMsg: error.message,
      request: {
        id: req.headers["x-kredx-comms-req-id"],
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
      },
    }
  );
  res.status(errorStatus);
  if (process.env.NODE_ENV === "production")
    res.json({
      status: errorStatus,
      message: error.message,
      error: error,
    });
  else
    res.json({
      status: errorStatus,
      message: error.message,
      error: error,
      stack: error.stack,
    });
});

app.listen(port, () => logger.info(`Listening on port ${port}`));
