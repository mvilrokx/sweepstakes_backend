const bcrypt = require("bcrypt");

const { db } = require("../lib/db.js");
const removeDisallowedFields = require("../lib/removeDisallowedFields.js")(
  "email",
  "id",
  "super_admin"
);
const loadSql = require("../lib/loadSql.js");

let sqls = {};

(async () => (sqls = await loadSql(db, "../sql/user")))();

const show = async id =>
  removeDisallowedFields(await db.one(sqls.showUser, { id }));
// const user = await db.oneOrNone(sqls.showUser, { id });
// return user
//   ? removeDisallowedFields(await db.oneOrNone(sqls.showUser, { id }))
//   : user;

const index = async () =>
  removeDisallowedFields(...(await db.any(sqls.indexUser)));

const destroy = async id => await db.one(sqls.destroyUser, { id });

const create = async ({ email, password, super_admin = false }) => {
  const hashedPwd = await bcrypt.hash(password, 10);

  return removeDisallowedFields(
    await db.one(sqls.createUser, {
      email,
      password: hashedPwd,
      super_admin,
    })
  );
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
  return removeDisallowedFields(await db.one(sqls.updateUser, updateValues));
};

const authenticate = async (email, password) => {
  const user = await db.oneOrNone(sqls.queryUserByEmail, { email });
  if (!user || !user.password) {
    return null;
  }

  return !bcrypt.compareSync(password, user.password)
    ? null
    : removeDisallowedFields(user);
};

module.exports = { show, index, destroy, create, update, authenticate };
