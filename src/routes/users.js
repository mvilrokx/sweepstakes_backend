const express = require("express");
const { body, normalizeEmail } = require("express-validator");

const { jwt } = require("../middleware/authentication.js");
const { validate } = require("../middleware/validate.js");
const { minimumPasswordLength } = require("../config");

const router = express.Router();

const userController = require("../controllers/user.js");

router.all("*", jwt);

router.route("/").get(userController.index); // .post(userController.create); <-- Users get created by the AUTH modules
router
  .route("/:userId")
  .get(userController.show)
  .delete(userController.destroy)
  .put(
    validate(
      body("email")
        .normalizeEmail()
        .isEmail()
        .withMessage("invalid email address"),
      body("password")
        .isLength({ min: minimumPasswordLength })
        .withMessage(
          `password must be at least ${minimumPasswordLength} characters long`
        )
    ),
    userController.update
  )
  .patch(
    validate(
      body("email")
        .normalizeEmail()
        .isEmail()
        .withMessage("invalid email address"),
      body("password")
        .isLength({ min: minimumPasswordLength })
        .withMessage(
          `password must be at least ${minimumPasswordLength} characters long`
        )
    ),
    userController.update
  );

module.exports = router;
