const { db } = require("../lib/db.js");
const loadSql = require("../lib/loadSql.js");

let sqls = {};

(async () => (sqls = await loadSql(db, "../sql/tournament")))();

const show = async id => await db.one(sqls.showTournament, { id });

const index = async () => await db.any(sqls.indexTournament);

const destroy = async id => await db.one(sqls.destroyTournament, { id });

const create = async ({ name, starts_at, ends_at }) =>
  await db.one(sqls.createTournament, {
    name,
    starts_at,
    ends_at,
  });

const update = async (id, values) => {
  const existing = await db.one(sqls.showTournament, { id });
  return await db.one(sqls.updateTournament, {
    ...existing,
    ...values,
  });
};

module.exports = { show, index, destroy, create, update };
