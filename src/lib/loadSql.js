const { stat, readdir } = require("fs/promises");
const { join, parse } = require("path");

const sqls = {};

async function loadSql(db, ...sqlFiles) {
  for (const sqlFile of sqlFiles) {
    const stats = await stat(join(__dirname, sqlFile));
    if (stats.isFile()) {
      sqls[parse(sqlFile).name] = new db.$config.pgp.QueryFile(
        join(__dirname, sqlFile),
        { minify: true }
      );
    } else if (stats.isDirectory()) {
      const files = (await readdir(join(__dirname, sqlFile))).map(fName =>
        join(sqlFile, fName)
      );
      await loadSql(db, ...files);
    }
  }
  return sqls;
}

module.exports = loadSql;
