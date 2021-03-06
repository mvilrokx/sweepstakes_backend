const express = require("express");

const userEntriesRouter = require("./userEntries.js");

const leagueUserController = require("../controllers/leagueUser.js");
const { jwt } = require("../middleware/authentication.js");

const router = express.Router({ mergeParams: true });

router.all("*", jwt);

router.use("/:league_user_id/entries", userEntriesRouter);

router;
// .route("/:league_id")
// .all(function (req, res, next) {
//   // runs for all HTTP verbs first
//   // think of it as route specific middleware!
//   next();
// })
// .get(leagueController.show)
// .put(leagueController.update)
// .patch(leagueController.update)
// .delete(leagueController.destroy);

// router.route("/").get(leagueController.index).post(leagueController.create);
router.route("/").post(leagueUserController.create);

module.exports = router;
