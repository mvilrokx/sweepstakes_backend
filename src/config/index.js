module.exports = {
  development: {
    port: process.env.DB_PORT || 5432,
    database: "sweepstakes",
    username: process.env.DB_USERNAME || "sweepstakes",
    password: process.env.DB_PASSWORD || "secret",
    host: process.env.DB_HOSTNAME || "localhost",
    // TODO: Something like this require('crypto').randomBytes(64).toString('hex')
    // but then only once, when the app gets started
    tokenSecret: process.env.AUTHENTICATION_TOKEN_SECRET || "notsosecret",
    authTokenIssuer:
      process.env.AUTHENTICATION_TOKEN_ISSUER || "dev.sweepstakes.com",
  },
};
