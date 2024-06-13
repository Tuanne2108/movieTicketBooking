const SeatService = require("../Services/SeatService");

const createSeat = async (req, res) => {
  try {
    const response = await SeatService.createSeat(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllSeats = async (req, res) => {
  try {
    const response = await SeatService.getAllSeats();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getSeatById = async (req, res) => {
  try {
    const response = await SeatService.getSeatById(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateSeat = async (req, res) => {
  try {
    const seatId = req.params.id;
    const data = req.body;
    if (!seatId) {
      return res.status(400).json({
        status: "Error",
        message: "The id is required",
      });
    }
    const response = await SeatService.updateSeat(seatId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

const deleteSeat = async (req, res) => {
  try {
    const seatId = req.params.id;
    if (!seatId) {
      return res.status(200).json({
        status: "Error",
        message: "The id is required",
      });
    }
    const response = await SeatService.deleteSeat(seatId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createSeat,
  getAllSeats,
  getSeatById,
  updateSeat,
  deleteSeat,
};
