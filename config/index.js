module.exports = {
  development: {
    port: process.env.DB_PORT || 5432,
    database: "sweepstakes",
    username: process.env.DB_USERNAME || "sweepstakes",
    password: process.env.DB_PASSWORD || "secret",
    host: process.env.DB_HOSTNAME || "localhost",
  },
};
