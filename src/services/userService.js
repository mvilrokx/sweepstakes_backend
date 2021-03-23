const bcrypt = require("bcrypt");
const { bcryptWorkFactor } = require("../config");
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

const index = async () =>
  // this weird construct is need for the edge case where there is only 1 user in the DB
  // in that case removeDisallowedFields will return a User object instead of a array of User Objects
  // however, this service should always return an array so this ensures that is the case
  [removeDisallowedFields(...(await db.any(sqls.indexUser)))].flat();

const destroy = async id => await db.one(sqls.destroyUser, { id });

const create = async ({ email, password, super_admin = false }) => {
  const hashedPwd = await bcrypt.hash(password, bcryptWorkFactor);

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
    updateValues.password = await bcrypt.hash(
      values.password,
      bcryptWorkFactor
    );
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
