const express = require("express");
const path = require("path");

const errorHandlerMiddleware = require("../middleware/errorHandler.js");
const missingPageMiddleware = require("../middleware/404.js");

const tournamentsRouter = require("../routes/tournaments");
const usersRouter = require("../routes/users");
const healthRouter = require("../routes/health");
const authRouter = require("../routes/auth");
const leaguesRouter = require("../routes/leagues");
const userEntriesRouter = require("../routes/userEntries");
const leagueUserRouter = require("../routes/leagueUsers");

module.exports = expressApp => {
  expressApp.use(express.urlencoded({ extended: false }));
  expressApp.use(express.static(path.join(__dirname, "public")));

  expressApp.use("/tournaments", tournamentsRouter);
  expressApp.use("/users", usersRouter);
  expressApp.use("/healthz", healthRouter);
  expressApp.use("/auth", authRouter);
  expressApp.use("/leagues", leaguesRouter);
  expressApp.use("/entries", userEntriesRouter);
  expressApp.use("/league_users", leagueUserRouter);

  // Route not found
  expressApp.use(missingPageMiddleware);

  // custom error handler
  expressApp.use(errorHandlerMiddleware);
};
