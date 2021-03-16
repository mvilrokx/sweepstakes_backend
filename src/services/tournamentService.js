const { join: joinPath } = require("path");

const { db } = require("../lib/db.js");

function sql(file) {
  const fullPath = joinPath(__dirname, file);
  return new db.$config.pgp.QueryFile(fullPath, { minify: true });
}

const showTournament = sql("../sql/showTournament.sql");
const indexTournament = sql("../sql/indexTournament.sql");
const destroyTournament = sql("../sql/destroyTournament.sql");
const createTournament = sql("../sql/createTournament.sql");
const updateTournament = sql("../sql/updateTournament.sql");

const show = async (id) => await db.oneOrNone(showTournament, { id });

const index = async () => await db.any(indexTournament);

const destroy = async (id) => await db.none(destroyTournament, { id });

const create = async ({ name, starts_at, ends_at }) =>
  await db.one(createTournament, {
    name,
    starts_at,
    ends_at,
  });

const update = async (id, values) => {
  const existing = await db.one(showTournament, { id });
  return await db.one(updateTournament, {
    ...existing,
    ...values,
  });
};

module.exports = { show, index, destroy, create, update };
