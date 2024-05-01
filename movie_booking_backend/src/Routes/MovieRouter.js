const express = require("express");
const router = express.Router();
const movieController = require("../Controllers/MovieController");
router.post("/", movieController.createMovie);

module.exports = router;
