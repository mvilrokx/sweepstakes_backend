const express = require("express");

const router = express.Router();

const tournamentController = require("../controllers/tournament.js");

router
  .route("/:tournamentId")
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
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  .get(tournamentController.index)
  .post(tournamentController.create);

module.exports = router;
