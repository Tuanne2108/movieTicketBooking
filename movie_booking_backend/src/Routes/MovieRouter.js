const express = require("express");
const router = express.Router();
const movieController = require("../Controllers/MovieController");

//Request
router.post("/", movieController.createMovie);


module.exports = router;
