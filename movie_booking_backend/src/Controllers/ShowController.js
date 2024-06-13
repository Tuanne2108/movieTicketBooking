const ShowService = require("../Services/ShowService");

const createShow = async (req, res) => {
  try {
    const response = await ShowService.createShow(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllShows = async (req, res) => {
  try {
    const response = await ShowService.getAllShows();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getShowById = async (req, res) => {
  try {
    const response = await ShowService.getShowById(req.params.id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateShow = async (req, res) => {
  try {
    const showId = req.params.id;
    const data = req.body;
    if (!showId) {
      return res.status(400).json({
        status: "Error",
        message: "The id is required",
      });
    }
    const response = await ShowService.updateShow(showId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};

const deleteShow = async (req, res) => {
  try {
    const showId = req.params.id;
    if (!showId) {
      return res.status(200).json({
        status: "Error",
        message: "The id is required",
      });
    }
    const response = await ShowService.deleteShow(showId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};


module.exports = {
  createShow,
  getAllShows,
  getShowById,
  updateShow,
  deleteShow,
};
