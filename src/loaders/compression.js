const compression = require("compression");

module.exports = expressApp => expressApp.use(compression());
