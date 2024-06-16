const Booking = require("../Models/Booking");
// const User = require("../Models/User");
const Show = require("../Models/Show");

const createBooking = (newBooking) => {
  return new Promise(async (resolve, reject) => {
    const { user, show, seats, bookingFee, totalPrice, status, payment } =
      newBooking;
    try {
      // const userExists = await User.findById(user);
      const showExists = await Show.findById(show);
      console.log("t dang test: ",showExists);
      if (!showExists) {
        return reject({
          status: "Error",
          message: "Invalid Show, or Seats",
        });
      }

      const createdBooking = await Booking.create({
        user,
        show,
        seats,
        bookingFee,
        totalPrice,
        status,
        payment,
      });
      if (createdBooking) {
        resolve({
          status: "Success",
          message: "Booking created successfully",
          data: createdBooking,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllBookings = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const bookings = await Booking.find()
        .populate("user")
        .populate("show")
        .populate("seats")
        .populate("payment");
      resolve({
        status: "Success",
        message: "Bookings fetched successfully",
        data: bookings,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getBookingById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const booking = await Booking.findById(id)
        .populate("user")
        .populate("show")
        .populate("seats")
        .populate("payment");
      resolve({
        status: "Success",
        message: "Booking fetched successfully",
        data: booking,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateBooking = async (id, updatedBooking) => {
  try {
    const checkBooking = await Booking.findOne({ _id: id });

    if (!checkBooking) {
      throw {
        status: "Error",
        message: "The booking does not exist",
      };
    }

    const updatedBookingData = await Booking.findByIdAndUpdate(
      id,
      updatedBooking,
      {
        new: true,
      }
    );

    return {
      status: "Success",
      message: "Booking updated successfully",
      data: updatedBookingData,
    };
  } catch (error) {
    throw error;
  }
};

const deleteBooking = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Booking.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "Booking deleted successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
