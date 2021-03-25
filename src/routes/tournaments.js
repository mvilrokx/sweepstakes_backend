const express = require("express");

const leaguesRouter = require("../routes/leagues");

const tournamentController = require("../controllers/tournament.js");
const { jwt } = require("../middleware/authentication.js");

const router = express.Router();

router.all("*", jwt);

router.use("/:tournament_id/leagues", leaguesRouter);

router
  .route("/:tournament_id")
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(tournamentController.show)
  .put(tournamentController.update)
  .patch(tournamentController.update)
  .delete(tournamentController.destroy);

router
  .route("/")
  .get(tournamentController.index)
  .post(tournamentController.create);

module.exports = router;
