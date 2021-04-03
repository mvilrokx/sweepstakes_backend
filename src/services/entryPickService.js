const { db } = require("../lib/db.js");
const loadSql = require("../lib/loadSql.js");

let sqls = {};

(async () => (sqls = await loadSql(db, "../sql/entry_pick")))();

const index = async ({ user_entry_id }) =>
  await db.any(sqls.indexEntryPicks, { user_entry_id });

const create = async ({ user_entry_id }, { tournament_team_id, position }) =>
  await db.one(sqls.createEntryPick, {
    user_entry_id,
    tournament_team_id,
    position,
  });

const update = async (id, values) => {
  const existing = await db.one(sqls.showEntryPick, { id });
  return await db.one(sqls.updateEntryPick, {
    ...existing,
    ...values,
  });
};

const destroy = async id => await db.one(sqls.destroyEntryPick, { id });

module.exports = { index, create, update, destroy };
