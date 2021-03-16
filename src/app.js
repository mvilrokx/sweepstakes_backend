const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const createError = require("http-errors");
var compression = require("compression");

const morganMiddleware = require("./config/morganMiddleware.js");

const tournamentsRouter = require("./routes/tournaments");

const app = express();

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(compression());

app.use("/tournaments", tournamentsRouter);

// Route not found
app.use((req, res, next) => {
  next(createError(404));
});

// custom error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: error.status,
    message: error.message,
    stack:
      process.env.NODE_ENV || "development" === "development"
        ? error.stack
        : "",
  });
});

module.exports = app;
