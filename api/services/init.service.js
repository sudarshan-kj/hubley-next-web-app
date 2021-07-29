const logger = reqlib("utils/winston");
const envConfig = reqlib("config/env.config");

const invalidValueSet = (envVariable) => {
  logger.error(`Invalid value set for ${envVariable}`);
};

const envVarNotSet = (envVariable, type = "error", msg) => {
  logger[type](`${envVariable} env variable is not set. ${msg}`);
};

const callExit = () => {
  logger.info("Exiting process");
  process.exit(1);
};

const checkWinstonLoggerEnv = () => {
  const loggerValue = process.env[envConfig.WINSTON_CONSOLE_LOGGER_LEVEL_VAR];
  if (!loggerValue)
    envVarNotSet(
      envConfig.WINSTON_CONSOLE_LOGGER_LEVEL_VAR,
      "warn",
      "Using default logger level INFO"
    );
  else {
    logger.info(`Logger level set to "${loggerValue}"`);
  }
};

const checkMongoDbEnv = () => {
  logger.info(`Performing db config check`);
  const mongoUserNameEnvVar = process.env[envConfig.MONGO_DB_ENV_USERNAME_VAR];
  const mongoPasswordEnvVar = process.env[envConfig.MONGO_DB_ENV_PASSWORD_VAR];
  if (!mongoUserNameEnvVar) {
    envVarNotSet(envConfig.MONGO_DB_ENV_USERNAME_VAR);
    callExit();
  }
  if (!mongoPasswordEnvVar) {
    envVarNotSet(envConfig.MONGO_DB_ENV_PASSWORD_VAR);
    callExit();
  }
};

const checkEnvVars = () => {
  // checkMongoDbEnv();
  checkWinstonLoggerEnv();
};

const preCheckAppConfig = () => {
  logger.info("Performing app config pre check");
  checkEnvVars();
  logger.info("App pre check successful");
};

preCheckAppConfig();
