const { addColors, format, createLogger, transports } = require("winston");
const { combine, timestamp, colorize, label, printf } = format;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => (process.env.NODE_ENV === "development" ? "debug" : "warn");

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

addColors(colors);

const myFormat = combine(
  label({ label: "sweepstakes-backend" }),
  timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  colorize({ all: true }),
  printf(
    ({ timestamp, label, level, message }) =>
      `${timestamp} [${label}] ${level}: ${message}`
  )
);

const myTransports = [
  new transports.Console(),
  new transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new transports.File({ filename: "logs/all.log" }),
];

const Logger = createLogger({
  level: level(),
  levels,
  format: myFormat,
  transports: myTransports,
});

module.exports = Logger;
