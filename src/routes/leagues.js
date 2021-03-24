const express = require("express");

const leagueController = require("../controllers/league.js");
const { jwt } = require("../middleware/authentication.js");

const router = express.Router({ mergeParams: true });

router.all("*", jwt);

router
  .route("/:leagueId")
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(leagueController.show)
  .put(leagueController.update)
  .patch(leagueController.update)
  .delete(leagueController.destroy);

router.route("/").get(leagueController.index).post(leagueController.create);

module.exports = router;
