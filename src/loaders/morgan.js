const morganMiddleware = require("../config/morganMiddleware.js");

module.exports = expressApp => expressApp.use(morganMiddleware);
