const cors = require("cors");

const { clientUrl } = require("../config");

module.exports = expressApp =>
  expressApp.use(cors({ credentials: true, origin: clientUrl }));
