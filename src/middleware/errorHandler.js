const { db } = require("../lib/db.js");

const QueryResultError = db.$config.pgp.errors.QueryResultError;

module.exports = (error, req, res, next) => {
  const { message = "Oops! Something went wrong", isBoom, output } = error;

  if (isBoom) {
    return res.status(output.statusCode).json({
      message,
      success: false,
      //   stack:
      //     process.env.NODE_ENV || "development" === "development"
      //       ? error.stack
      //       : "",
    });
  }

  // TODO Improve this so I can handle DB Errors better
  // See http://vitaly-t.github.io/pg-promise/errors.QueryResultError.html for example
  // https://github.com/vitaly-t/pg-promise/blob/57537750292f303c0d9f566d04c66e33405421ed/lib/errors/query-result-error.js#L126
  if (error instanceof QueryResultError) {
    // is pg-promise Error
    console.log("QueryResultError!");
  }

  // https://github.com/brianc/node-postgres/blob/45fa27ea4ae9a9a9cf78b50b325d8da871b1c796/packages/pg-protocol/src/messages.ts
  // if (error instanceof DatabaseError) {
  // // is node-postgres error
  // console.log("DatabaseError!");
  // }

  console.log(JSON.stringify(error));
  console.log(JSON.stringify(error.constructor.name));

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
