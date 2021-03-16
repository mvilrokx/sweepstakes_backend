const { username, password, host, port, database } = require("../config")[
  process.env.NODE_ENV || "development"
];

const initOptions = {};

const pgp = require("pg-promise")(initOptions);

const db = pgp(
  `postgres://${username}:${password}@${host}:${port}/${database}`
);

module.exports = {
  db,
};
