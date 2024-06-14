const express = require("express");
const router = express.Router();
const theaterController = require("../Controllers/TheaterController");
const {
    authMiddleware,
  } = require("../Middlewares/authMiddle");

//Request
router.post("/create-theater", theaterController.createTheater)
router.get("/get-all-theaters", theaterController.getAllTheaters);
router.get("/get-theater/:id", theaterController.getTheaterById);
router.put("/update-theater/:id", theaterController.updateTheater);
router.delete("/delete-theater/:id", theaterController.deleteTheater);


module.exports = router;
