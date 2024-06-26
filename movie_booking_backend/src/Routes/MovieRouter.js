const express = require("express");
const router = express.Router();
const movieController = require("../Controllers/MovieController");
const { authMiddleware } = require("../Middlewares/authMiddle");

<<<<<<< HEAD
//Request
router.post("/create-movie", authMiddleware, movieController.createMovie);
router.put("/update-movie/:id", authMiddleware, movieController.updateMovie);
router.delete("/delete-movie/:id", authMiddleware, movieController.deleteMovie);

router.get("/get-movie/:id", authMiddleware, movieController.getMovie);
router.get("/get-all-movies", authMiddleware, movieController.getAllMovies);
=======
>>>>>>> testAPI

//Request
router.post("/create-movie", movieController.createMovie);
router.get("/get-all-movies", movieController.getAllMovie);
router.get("/get-movie/:id", movieController.getMovieById);
router.put("/update-movie/:id", movieController.updateMovie);
router.delete("/delete-movie/:id", movieController.deleteMovie);
router.delete("/delete-all-movies", movieController.deleteAllMovies);

module.exports = router;
