const { stat, readdir } = require("fs/promises");
const { join, parse } = require("path");
const Logger = require("./logger");

const sqls = {};

async function loadSql(db, ...sqlFiles) {
  for (const sqlFile of sqlFiles) {
    try {
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
    } catch (err) {
      Logger.error(`Unable to load SQL File or Directory ${sqlFile}`);
    }
  }
  return sqls;
}

module.exports = loadSql;
