const createError = require("http-errors");

module.exports = (error, req, res) => next(createError(404));
