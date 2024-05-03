const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");

//Request
router.post("/", userController.createUser);


module.exports = router;
