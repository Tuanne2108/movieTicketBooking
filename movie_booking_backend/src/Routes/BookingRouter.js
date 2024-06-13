const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/BookingController");

//Request
router.post("/create-booking", bookingController.createBooking);
router.get("/get-bookings", bookingController.getAllBookings);
router.get("/get-booking-byId/:id", bookingController.getBookingById);
router.put("/update-booking/:id", bookingController.updateBooking);
router.delete("/delete-booking/:id", bookingController.deleteBooking);

module.exports = router;
