const http = require("http");
const Logger = require("../lib/logger.js");

const { appHost, port, healthCheckPath } = require("./src/config");

const options = {
  timeout: 2000,
  host: appHost,
  port: port,
  path: healthCheckPath, // must be the same as HEALTHCHECK in Dockerfile
};

const request = http.request(options, res => {
  console.info("STATUS: " + res.statusCode);
  process.exitCode = res.statusCode === 200 ? 0 : 1;
  process.exit();
});

request.on("error", function (err) {
  console.error("ERROR", err);
  Logger.crit("Healcheck failed", err);
  process.exit(1);
});

request.end();
