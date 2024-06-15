const TheaterService = require("../Services/TheaterService");

const createTheater = async (req, res) => {
  try {
    const { name, location, numberOfSeats } = req.body;
    if (!name || !location || !numberOfSeats) {
      return res.status(200).json({
        status: "Error",
        message: "All fields are required",
      });
    }
    const response = await TheaterService.createTheater(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllTheaters = async (req, res) => {
  try {
    const response = await TheaterService.getAllTheaters();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getTheaterById = async (req, res) => {
  try {
    const response = await TheaterService.getTheaterById(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateTheater = async (req, res) => {
  try {
    const theaterId = req.params.id;
    const data = req.body;
    if (!theaterId) {
      return res.status(400).json({
        status: "Error",
        message: "The id is required",
      });
    }
    const response = await TheaterService.updateTheater(theaterId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

const deleteTheater = async (req, res) => {
  try {
    const theaterId = req.params.id;
    if (!theaterId) {
      return res.status(200).json({
        status: "Error",
        message: "The id is required",
      });
    }
    const response = await TheaterService.deleteTheater(theaterId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

module.exports = {
  createTheater,
  getAllTheaters,
  getTheaterById,
  updateTheater,
  deleteTheater,
};
