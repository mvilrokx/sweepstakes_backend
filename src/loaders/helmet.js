const helmet = require("helmet");

module.exports = expressApp => expressApp.use(helmet());
