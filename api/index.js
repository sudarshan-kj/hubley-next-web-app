global.reqlib = require("app-root-path").require;
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 9000;
reqlib("services/init.service");
const cors = require("cors");
const app = express();
const createError = require("http-errors");
const morgan = require("morgan");
const logger = reqlib("utils/winston");
const helmet = require("helmet");
const { emailServiceRouter, textServiceRouter, templateServiceRouter } =
  reqlib("/routes");

/*USER COMMUNICATIONS MAIN MODULE*/

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message),
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
  res.status(200).send({ message: process.env.WINSTON_CONSOLE_LOGGER_LEVEL })
);

/*Custom api router for handling all api requests*/
app.use("/api", apiRouter);
apiRouter.use("/service/email", emailServiceRouter);
apiRouter.use("/service/text", textServiceRouter);
apiRouter.use("/service/template", templateServiceRouter);

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
  res.json({
    status: errorStatus,
    message: error.message,
    stack: error.stack,
  });
});

app.listen(port, () => logger.info(`Listening on port ${port}`));
