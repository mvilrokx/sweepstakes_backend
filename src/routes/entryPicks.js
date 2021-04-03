const express = require("express");

const entryPickController = require("../controllers/entryPick.js");
const { jwt } = require("../middleware/authentication.js");

const router = express.Router({ mergeParams: true });

router.all("*", jwt);

router
  .route("/:entry_pick_id")
  // .get(entryPickController.show)
  .put(entryPickController.update)
  .patch(entryPickController.update)
  .delete(entryPickController.destroy);

router
  .route("/")
  .get(entryPickController.index)
  .post(entryPickController.create);

module.exports = router;
