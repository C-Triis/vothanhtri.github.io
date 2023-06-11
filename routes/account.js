"use strict";

const express = require('express');
const router = express.Router({});
const UserController = require('../controllers/userController.js');

router.get("/register", (req, res) => {
  res.render("pages/account/register");
});
router.get("/verifyUser", (req, res) => {
  res.render("pages/account/verify");
});
router.get("/login", (req, res) => {
  res.render("pages/account/login");
});
router.get("/confirm", (req, res) => {
  res.render("pages/account/reset");
});

router.post("/register", UserController.register);
router.post("/verify", UserController.verify);
router.post("/login", UserController.login);
router.post("/confirm", UserController.confirm);

module.exports = router;