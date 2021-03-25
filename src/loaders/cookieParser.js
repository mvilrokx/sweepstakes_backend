const cookieParser = require("cookie-parser");

module.exports = expressApp => expressApp.use(cookieParser());
