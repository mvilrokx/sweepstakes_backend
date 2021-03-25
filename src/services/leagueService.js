const { db } = require("../lib/db.js");
const loadSql = require("../lib/loadSql.js");

let sqls = {};

(async () => (sqls = await loadSql(db, "../sql/league")))();

const show = async id => await db.one(sqls.showLeague, { id });

const index = async tournamentId =>
  await db.any(sqls.indexLeagues, { tournamentId });

const destroy = async id => await db.one(sqls.destroyLeague, { id });

const create = async (tournament_id, { name }) =>
  await db.one(sqls.createLeague, {
    name,
    tournament_id,
  });

const update = async (id, values) => {
  const existing = await db.one(sqls.showLeague, { id });
  return await db.one(sqls.updateLeague, {
    ...existing,
    ...values,
  });
};

module.exports = { show, index, destroy, create, update };
