const passport = require("passport");

module.exports = expressApp => expressApp.use(passport.initialize());
