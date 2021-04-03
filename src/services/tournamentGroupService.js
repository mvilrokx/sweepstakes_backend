const { db } = require("../lib/db.js");
const loadSql = require("../lib/loadSql.js");

let sqls = {};

(async () => (sqls = await loadSql(db, "../sql/tournament_group")))();

const index = async tournament_id =>
  await db.any(sqls.indexTournamentGroup, { tournament_id });

module.exports = { index };
