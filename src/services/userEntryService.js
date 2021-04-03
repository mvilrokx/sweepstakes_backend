const { db } = require("../lib/db.js");
const loadSql = require("../lib/loadSql.js");

let sqls = {};

(async () => (sqls = await loadSql(db, "../sql/user_entry")))();

const create = async ({ league_user_id }, { league_id, name }) =>
  await db.one(sqls.createUserEntry, {
    name,
    league_id,
    league_user_id,
  });

const update = async ({ user_entry_id }, values) => {
  const existing = await db.one(sqls.showUserEntry, { user_entry_id });
  return await db.one(sqls.updateUserEntry, {
    ...existing,
    ...values,
  });
};

const show = async ({ user_entry_id }) =>
  await db.one(sqls.showUserEntry, { user_entry_id });

const destroy = async id => await db.one(sqls.destroyUserEntry, { id });

module.exports = { create, show, update, destroy };
