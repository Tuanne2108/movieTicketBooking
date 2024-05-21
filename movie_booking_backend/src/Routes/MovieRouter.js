const express = require("express");
const router = express.Router();
const movieController = require("../Controllers/MovieController");

//Request
router.post("/", movieController.createMovie);
router.get("/get-all-movies", movieController.getAllMovie);

module.exports = router;
