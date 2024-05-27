const express = require("express");
const router = express.Router();
const movieController = require("../Controllers/MovieController");

//Request
router.post("/create-movie", movieController.createMovie);
router.get("/get-all-movies", movieController.getAllMovie);
router.get("/get-movie/:id", movieController.getMovieById);
router.put("/update-movie/:id", movieController.updateMovie);
router.delete("/delete-movie/:id", movieController.deleteMovie);

module.exports = router;
