const Logger = require("../lib/logger.js");
const { db } = require("../lib/db.js");

const QueryResultError = db.$config.pgp.errors.QueryResultError;
const { DatabaseError } = require("pg-protocol");
const { ValidatorError } = require("./validate.js");

const qrec = db.$config.pgp.errors.queryResultErrorCode;

module.exports = (error, req, res, next) => {
  const { message = "Oops! Something went wrong", isBoom, output } = error;

  Logger.debug(
    `Error constructor =  ${JSON.stringify(error.constructor.name)}`
  );
  Logger.debug(`Full Error JSON = ${JSON.stringify(error)}`);
  Logger.debug(`Full Error Object = ${error}`);

  if (isBoom) {
    Logger.debug("isBoom!");
    return res.status(output.statusCode).json({
      message,
      success: false,
    });
  }

  // See http://vitaly-t.github.io/pg-promise/errors.QueryResultError.html for example
  // https://github.com/vitaly-t/pg-promise/blob/57537750292f303c0d9f566d04c66e33405421ed/lib/errors/query-result-error.js#L126
  if (error instanceof QueryResultError) {
    Logger.debug(
      `QueryResultError (code = ${error.code}): ${error.message} ${error.query}`
    );
    // is pg-promise Error
    if (error.code === qrec.noData) {
      // Record not found
      return res.status(404).json({
        message: error.message,
        success: false,
      });
    }
  }

  // https://github.com/brianc/node-postgres/blob/45fa27ea4ae9a9a9cf78b50b325d8da871b1c796/packages/pg-protocol/src/messages.ts
  if (error instanceof DatabaseError) {
    Logger.debug(JSON.stringify(error));
    // is node-postgres error
    switch (error.code) {
      case "23514": // db-constraint error
      case "23502": // 	NOT NULL VIOLATION (i.e. a missing field)
      case "22007": // invalid data time format (is missing error.detail)
      case "23503": // FK Constraint
        return res.status(400).json({
          message: error.message,
          success: false,
          error,
        });
        break;
      case "23505": // duplicate key
        return res.status(400).json({
          message: error.detail,
          success: false,
          error,
        });
        break;
    }
  }

  if (error instanceof ValidatorError) {
    // express-validator error
    return res.status(400).json({
      message: error.results,
      success: false,
    });
  }

  return res.status(500).json({
    status: error.status,
    message,
    success: false,
    stack:
      process.env.NODE_ENV || "development" === "development"
        ? error.stack
        : "",
  });
};
