const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/BookingController");

//Request
router.post("/", bookingController.createBooking);


module.exports = router;
