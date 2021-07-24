const userRouter = require("express").Router();
const { PathParams } = reqlib("config");
const userHandler = reqlib("/handlers/userHandler");
const UserValidationMiddleware = reqlib(
  "middlewares/user.validation.middleware"
);
const UtilsMiddleware = reqlib("middlewares/utils.middleware");
const { ValidatePageQueryParam, ValidateShowQueryParam } = reqlib(
  "utils/queryParamsValidator"
);
const { ValidateUserIdPathParam } = reqlib("utils/pathParamsValidator");

/*
HTTP GET Requests
*/

userRouter.get("/health", userHandler.health);

userRouter.get("/list", [
  UtilsMiddleware.validateQueryParams([
    ValidatePageQueryParam,
    ValidateShowQueryParam,
  ]),
  userHandler.listUsers,
]);

userRouter.get(`/:${PathParams.USER_ID}`, [
  UtilsMiddleware.validatePathParams([ValidateUserIdPathParam]),
  userHandler.getUser,
]);

/*
HTTP POST REQUESTS
*/

userRouter.post("/create", [
  UserValidationMiddleware.validateCreateUserInput,
  userHandler.createUser,
]);

/*
HTTP PUT REQUESTS
*/

userRouter.put(`/:${PathParams.USER_ID}`, [
  UtilsMiddleware.validatePathParams([ValidateUserIdPathParam]),
  userHandler.updateUser,
]);

/*
HTTP DELETE REQUESTS
*/

userRouter.delete(`/:${PathParams.USER_ID}`, [
  UtilsMiddleware.validatePathParams([ValidateUserIdPathParam]),
  userHandler.deleteUser,
]);

/* Requests end here */
module.exports = userRouter;
