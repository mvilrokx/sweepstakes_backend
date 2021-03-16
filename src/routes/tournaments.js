const express = require("express");

const router = express.Router();

const tournamentController = require("../controllers/tournament.js");

router.get("/", tournamentController.index);
router.get("/:tournamentId", tournamentController.show);
router.post("/", tournamentController.create);
router.delete("/:tournamentId", tournamentController.destroy);
router.put("/:tournamentId", tournamentController.update);
router.patch("/:tournamentId", tournamentController.update);

module.exports = router;
