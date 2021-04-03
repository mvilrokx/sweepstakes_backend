const express = require("express");

const tournamentGroupController = require("../controllers/tournamentGroup.js");
const { jwt } = require("../middleware/authentication.js");

const router = express.Router({ mergeParams: true });

router.all("*", jwt);

router.route("/").get(tournamentGroupController.index);

module.exports = router;
