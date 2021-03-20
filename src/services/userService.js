const bcrypt = require("bcrypt");

const { db } = require("../lib/db.js");
const removeDisallowedFields = require("../lib/removeDisallowedFields.js");
const loadSql = require("../lib/loadSql.js");

// TODO: Make this more "generic"
const allowedFields = ["email", "id"];
// TODO: Make this more "generic"
// This should automatically apply to ALL response so that NO secret information EVER leaks to the client

let sqls = {};

(async () => (sqls = await loadSql(db, "../sql/user")))();

const show = async id => await db.oneOrNone(sqls.showUser, { id });
const index = async () => await db.any(sqls.indexUser);

const destroy = async id => await db.none(sqls.destroyUser, { id });

const create = async ({ email, password, super_admin = false }) => {
  const hashedPwd = await bcrypt.hash(password, 10);

  return await db.one(sqls.createUser, {
    email,
    password: hashedPwd,
    super_admin,
  });
};

const update = async (id, values) => {
  const existing = await db.one(sqls.showUser, { id });
  const updateValues = {
    ...existing,
    ...values,
  };
  if (values.password) {
    updateValues.password = await bcrypt.hash(values.password, 10);
  }
  return await db.one(sqls.updateUser, updateValues);
};

const authenticate = async (email, password) => {
  const user = await db.oneOrNone(sqls.queryUserByEmail, { email });
  if (!user || !user.password) {
    return null;
  }

  return !bcrypt.compareSync(password, user.password)
    ? null
    : removeDisallowedFields(user, allowedFields);
};

module.exports = { show, index, destroy, create, update, authenticate };
