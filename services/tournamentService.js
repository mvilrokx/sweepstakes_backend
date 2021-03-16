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

const show = async (id) => {
  try {
    const result = await db.oneOrNone(showTournament, { id });
    return { success: true, body: result };
  } catch (err) {
    return { success: false, error: err };
  }
};

const index = async () => {
  try {
    const result = await db.any(indexTournament);
    return { success: true, body: result };
  } catch (err) {
    return { success: false, error: err };
  }
};

const destroy = async (id) => {
  try {
    await db.none(destroyTournament, { id });
    return { success: true, body: {} };
  } catch (err) {
    return { success: false, error: err };
  }
};

const create = async ({ name, starts_at, ends_at }) => {
  try {
    const newResult = await db.one(createTournament, {
      name,
      starts_at,
      ends_at,
    });
    return { success: true, body: { ...newResult, name, starts_at, ends_at } };
  } catch (err) {
    return { success: false, error: err };
  }
};

module.exports = { show, index, destroy, create };
