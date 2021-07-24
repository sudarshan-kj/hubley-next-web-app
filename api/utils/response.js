const logger = reqlib("utils/winston");

function successResponseObject() {
  return {
    status: this.status,
    message: this.message,
    data: this.data,
    meta: this.meta,
  };
}

function errorResponseObject() {
  return {
    status: this.status,
    message: this.message,
  };
}

class Response {
  constructor(res, message, data, meta) {
    this.res = res;
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
  ok() {
    this.status = "OK";
    return this.res.status(200).send(successResponseObject.call(this));
  }
  badRequest() {
    this.status = "BAD_REQUEST";
    return this.res.status(400).send(errorResponseObject.call(this));
  }
}

exports.createOkResponse = (res, message, data, meta, logLevel = "debug") => {
  logger[logLevel](`${message}`, { data, meta });
  return new Response(res, message, data, meta).ok();
};

exports.createBadRequestResponse = (res, message, logLevel = "info") => {
  logger[logLevel](`${message}`);
  return new Response(res, message).badRequest();
};
