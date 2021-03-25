const { db } = require("../lib/db.js");
const loadSql = require("../lib/loadSql.js");

let sqls = {};

(async () => (sqls = await loadSql(db, "../sql/league_user")))();

// const show = async id => await db.one(sqls.showLeagueUser, { id });

// const index = async tournament_id =>
//   await db.any(sqls.indexLeagueUsers, { tournament_id });

// const destroy = async id => await db.one(sqls.destroyLeagueUser, { id });

const create = async (user_id, { league_id }) =>
  await db.one(sqls.createLeagueUser, {
    user_id,
    league_id,
  });

// const update = async (id, values) => {
//   const existing = await db.one(sqls.showLeagueUser, { id });
//   return await db.one(sqls.updateLeagueUser, {
//     ...existing,
//     ...values,
//   });
// };

// module.exports = { show, index, destroy, create, update };
module.exports = { create };
