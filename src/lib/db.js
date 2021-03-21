const {
  dbUsername,
  dbPassword,
  dbHost,
  dbPort,
  databaseName,
} = require("../config");

const pgp = require("pg-promise")({});

const db = pgp(
  `postgres://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${databaseName}`
);

module.exports = {
  db,
};
