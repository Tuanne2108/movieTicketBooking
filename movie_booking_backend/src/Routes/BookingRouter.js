const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/BookingController");

//Request
router.post("/create-booking", bookingController.createBooking);
router.get("/get-bookings", bookingController.getAllBookings);
router.get("/get-booking/:id", bookingController.getBookingById);
router.get("/get-booking-byUserId/:id", bookingController.getBookingsByUserId);

module.exports = router;
