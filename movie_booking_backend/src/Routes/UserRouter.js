const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");

//Request
router.post("/sign-up", userController.createUser);
router.post("/sign-in", userController.loginUser);


module.exports = router;
