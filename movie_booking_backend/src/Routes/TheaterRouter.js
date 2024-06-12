const express = require("express");
const router = express.Router();
const theaterController = require("../Controllers/TheaterController");

//Request
router.get("/create-theater", theaterController.createTheater)
router.get("/get-all-theaters", theaterController.getTheaters);
router.get("/get-theater/:id", theaterController.getTheaterById);
router.put("/update-theater/:id", theaterController.updateTheater);


module.exports = router;
