const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");

const morganMiddleware = require("./config/morganMiddleware.js");
const errorHandlerMiddleware = require("./middleware/errorHandler.js");
const missingPageMiddleware = require("./middleware/404.js");
const { clientUrl } = require("./config");

const tournamentsRouter = require("./routes/tournaments");
const usersRouter = require("./routes/users");
const healthRouter = require("./routes/health");
const authRouter = require("./routes/auth");
const leaguesRouter = require("./routes/leagues");

const app = express();

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(compression());
app.use(cors({ credentials: true, origin: clientUrl }));
app.use(passport.initialize());

app.use("/tournaments", tournamentsRouter);
app.use("/users", usersRouter);
app.use("/healthz", healthRouter);
app.use("/auth", authRouter);
app.use("/leagues", leaguesRouter);

// Route not found
app.use(missingPageMiddleware);

// custom error handler
app.use(errorHandlerMiddleware);

module.exports = app;
