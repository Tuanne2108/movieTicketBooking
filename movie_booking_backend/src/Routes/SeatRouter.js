const express = require("express");
const router = express.Router();
const seatController = require("../Controllers/SeatController");


//Request
router.post("/get-theaters/:theaterId/get-show/:showtimeId/get-all-seats", seatController.createSeat)
router.get('/get-theaters/:theaterId/get-show/:showtimeId/get-all-seats', seatController.getAllSeats);
router.post('/get-theaters/:theaterId/get-show/:showtimeId/book', seatController.bookSeats);
router.put("/get-all-seats/:id", seatController.updateSeat);
router.delete("/get-all-seats/:id", seatController.deleteSeat);


module.exports = router;
