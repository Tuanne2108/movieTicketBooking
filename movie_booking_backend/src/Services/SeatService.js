const Seat = require("../Models/Seat");
const Booking = require("../Models/Booking");
const createSeat = async (theaterId, showtimeId, seatData) => {
  try {
    const newSeat = new Seat({ ...seatData, theaterId, showtimeId });
    await newSeat.save();
    return newSeat;
  } catch (error) {
    throw new Error("Error adding seat");
  }
};
const getAllSeats = async (theaterId, showtimeId) => {
  try {
    return await Seat.find({ theaterId, showtimeId });
  } catch (error) {
    throw new Error("Error fetching seats");
  }
};

const updateSeat = async (seatId, seatData) => {
  try {
    const updatedSeat = await Seat.findByIdAndUpdate(seatId, seatData, {
      new: true,
    });
    return updatedSeat;
  } catch (error) {
    throw new Error("Error updating seat");
  }
};

const deleteSeat = async (seatId) => {
  try {
    await Seat.findByIdAndDelete(seatId);
  } catch (error) {
    throw new Error("Error deleting seat");
  }
};
const bookSeats = async (theaterId, showtimeId, seatIds) => {
  try {
    // Check seat availability
    const bookedSeats = await Seat.find({
      theaterId,
      showtimeId,
      _id: { $in: seatIds },
      booked: true,
    });
    if (bookedSeats.length > 0) {
      throw new Error("Some seats are already booked");
    }

    // Book the seats
    await Seat.updateMany({ _id: { $in: seatIds } }, { booked: true });

    // Create a booking record
    const booking = new Booking({ theaterId, showtimeId, seats: seatIds });
    await booking.save();

    return booking;
  } catch (error) {
    throw new Error(error.message || "Error booking seats");
  }
};
module.exports = {
  createSeat,
  getAllSeats,
  updateSeat,
  deleteSeat,
  bookSeats,
};
