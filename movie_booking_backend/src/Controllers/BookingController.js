const Booking = require("../Models/Booking");
const Show = require("../Models/Show"); 
const Seat = require("../Models/Seat"); 

const createBooking = async (userId, showId, seats) => {
  try {
    const show = await Show.findById(showId);
    if (!show) {
      throw new Error("Show not found");
    }

    // Validate seat availability (optional, assuming Seat model)
    const unavailableSeats = await Seat.find({
      _id: { $in: seats },
      status: "booked",
    });
    if (unavailableSeats.length > 0) {
      throw new Error("Some selected seats are unavailable");
    }

    let totalPrice = show.price * seats.length; // Calculate total price based on seat count

    const booking = new Booking({
      user: userId,
      show,
      seats,
      totalPrice,
    });

    // Update seat status to booked (optional, assuming Seat model)
    await Seat.updateMany({ _id: { $in: seats } }, { status: "booked" });

    const savedBooking = await booking.save();
    return savedBooking;
  } catch (err) {
    throw err;
  }
};
const getAllBookings = async () => {
    try {
      const bookings = await Booking.find().populate("show"); // Populate show details
      return bookings;
    } catch (err) {
      throw err;
    }
  };
const getBookingById = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId).populate("show"); // Populate show details
    return booking;
  } catch (err) {
    throw err;
  }
};

const getBookingsByUserId = async (userId) => {
  try {
    const bookings = await Booking.find({ user: userId }).populate("show"); // Populate show details
    return bookings;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createBooking,
  getBookingById,
  getBookingsByUserId,
  getAllBookings,
};
