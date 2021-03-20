const express = require("express");
const { signup, login } = require("../middleware/authentication.js");
const router = express.Router();

router.post("/signup", signup, async (req, res, next) => {
  res.json({
    message: "Signup successful",
    user: req.user,
  });
});

router.post("/login", login, async (req, res, next) => {
  res.json({
    message: "Signin successful",
    user: req.user,
  });
});

module.exports = router;
