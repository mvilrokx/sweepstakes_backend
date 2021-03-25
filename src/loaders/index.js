const morganLoader = require("./morgan.js");
const jsonBodyParserLoader = require("./jsonBodyParser.js");
const cookieParserLoader = require("./cookieParser.js");
const helmetLoader = require("./helmet.js");
const compressionLoader = require("./compression.js");
const corsLoader = require("./cors.js");
const passportLoader = require("./passport.js");
const expressLoader = require("./express.js");

const Logger = require("../lib/logger.js");

module.exports = expressApp => {
  morganLoader(expressApp);
  Logger.info("Morgan middleware initialized");
  jsonBodyParserLoader(expressApp);
  Logger.info("JSON Body Parser middleware initialized");
  cookieParserLoader(expressApp);
  Logger.info("Cookie Parser middleware initialized");
  helmetLoader(expressApp);
  Logger.info("Helmet middleware initialized");
  compressionLoader(expressApp);
  Logger.info("Compression middleware initialized");
  corsLoader(expressApp);
  Logger.info("CORS middleware initialized");
  passportLoader(expressApp);
  Logger.info("Passport middleware initialized");
  expressLoader(expressApp);
  Logger.info("Express initialized!!!");
};
