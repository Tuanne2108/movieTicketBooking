const express = require("express");
const router = express.Router();
const movieController = require("../Controllers/MovieController");
const { authMiddleware } = require("../Middlewares/authMiddle");

//Request
router.post("/create-movie", authMiddleware, movieController.createMovie);
router.put("/update-movie/:id", authMiddleware, movieController.updateMovie);
router.delete("/delete-movie/:id", authMiddleware, movieController.deleteMovie);

router.get("/get-movie/:id", authMiddleware, movieController.getMovie);
router.get("/get-all-movies", authMiddleware, movieController.getAllMovies);


module.exports = router;
