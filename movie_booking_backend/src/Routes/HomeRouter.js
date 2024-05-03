const express = require("express");
const HomeController = require("../Controllers/HomeController");
const router = express.Router();

router.use("/", HomeController.index);

module.exports = router;
