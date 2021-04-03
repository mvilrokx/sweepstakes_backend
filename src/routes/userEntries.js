const express = require("express");

const entryPicksRouter = require("./entryPicks.js");

const userEntryController = require("../controllers/userEntry.js");
const { jwt } = require("../middleware/authentication.js");

const router = express.Router({ mergeParams: true });

router.all("*", jwt);

router.use("/:user_entry_id/picks", entryPicksRouter);

router
  .route("/:user_entry_id")
  // .all(function (req, res, next) {
  //   // runs for all HTTP verbs first
  //   // think of it as route specific middleware!
  //   next();
  // })
  .get(userEntryController.show)
  .put(userEntryController.update)
  .patch(userEntryController.update)
  .delete(userEntryController.destroy);

// router.route("/").get(userEntryController.index).post(userEntryController.create);
router.route("/").post(userEntryController.create);

module.exports = router;
