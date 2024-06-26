const BookingService = require("../Services/BookingService");

const createBooking = async (req, res) => {
  try {
    const response = await BookingService.createBooking(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const response = await BookingService.getAllBookings();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const response = await BookingService.getBookingById(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const data = req.body;
    if (!bookingId) {
      return res.status(400).json({
        status: "Error",
        message: "The id is required",
      });
    }
    const response = await BookingService.updateBooking(bookingId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    if (!bookingId) {
      return res.status(200).json({
        status: "Error",
        message: "The id is required",
      });
    }
    const response = await BookingService.deleteBooking(bookingId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};


module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
