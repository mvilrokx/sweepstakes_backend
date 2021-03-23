const express = require("express");
const { body, check, normalizeEmail } = require("express-validator");
const { validate } = require("../middleware/validate.js");
const { minimumPasswordLength } = require("../config");

const { signup, login } = require("../middleware/authentication.js");

const router = express.Router();

router.all(
  "*",
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
  )
);

router.post("/signup", signup);

router.post("/login", login);

module.exports = router;
