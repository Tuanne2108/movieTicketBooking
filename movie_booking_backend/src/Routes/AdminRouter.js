const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/AdminController");

//Request
router.post("/create", adminController.createAdmin);


module.exports = router;
