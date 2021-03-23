const { validationResult } = require("express-validator");

class ValidatorError extends Error {
  constructor(results, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidatorError);
    }

    this.name = "ValidatorError";
    // Custom debugging information
    this.results = results;
  }
}

const validate = (...validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    next(new ValidatorError(errors));
  };
};

module.exports = {
  validate,
  ValidatorError,
};
