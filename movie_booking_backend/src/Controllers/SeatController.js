const SeatService = require("../Services/SeatService");

const createSeat = async (req, res) => {
  try {
    const { theaterId, showtimeId } = req.params;
    const seatData = req.body;
    const newSeat = await SeatService.createSeat(
      theaterId,
      showtimeId,
      seatData
    );
    res.status(201).json(newSeat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding seat", error: error.message });
  }
};

const getAllSeats = async (req, res) => {
  try {
    const { theaterId, showtimeId } = req.params;
    const seats = await SeatService.getAllSeats(theaterId, showtimeId);
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching seats" });
  }
};

const updateSeat = async (req, res) => {
  try {
    const { seatId } = req.params;
    const seatData = req.body;
    const updatedSeat = await SeatService.updateSeat(seatId, seatData);
    res.status(200).json(updatedSeat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating seat", error: error.message });
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

const bookSeats = async (req, res) => {
  try {
    const { theaterId, showtimeId } = req.params;
    const { seats } = req.body;
    const result = await SeatService.bookSeats(theaterId, showtimeId, seats);
    res.status(200).json({ message: "Booking successful", result });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error booking seats", error: error.message });
  }
};

module.exports = {
  createSeat,
  getAllSeats,
  updateSeat,
  deleteSeat,
  bookSeats,
};
