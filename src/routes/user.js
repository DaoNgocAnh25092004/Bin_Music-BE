const express = require("express");
const router = express.Router();

const userController = require("../controllers/UserController");

router.post("/login-google", (req, res, next) =>
  userController.loginGoogle(req, res, next)
);

module.exports = router;
