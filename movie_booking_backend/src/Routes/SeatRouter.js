const express = require("express");
const router = express.Router();
const seatController = require("../Controllers/SeatController");

//Request
router.post("/create-seat", seatController.createSeat)
router.get("/get-all-seats", seatController.getAllSeats);
router.get("/get-seat/:id", seatController.getSeatById);
router.put("/update-seat/:id", seatController.updateSeat);
router.delete("/delete-seat/:id", seatController.deleteSeat);


module.exports = router;
