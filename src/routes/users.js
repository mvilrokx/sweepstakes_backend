const express = require("express");
const { jwt } = require("../middleware/authentication.js");

const router = express.Router();

const userController = require("../controllers/user.js");

router.route("/").get(userController.index); // .post(userController.create); <-- Users get created by the AUTH modules
router
  .route("/:userId")
  .get(jwt, userController.show)
  .delete(userController.destroy)
  .put(userController.update)
  .patch(userController.update);

module.exports = router;
