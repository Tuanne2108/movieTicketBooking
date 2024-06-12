const Show = require("../Models/Show");
const Movie = require("../Models/Movie"); // For populating movie details

const getShows = async () => {
  try {
    const shows = await Show.find().populate("movie theater"); // Populate movie and theater details
    return shows;
  } catch (err) {
    throw err;
  }
};

const getShowById = async (showId) => {
  try {
    const show = await Show.findById(showId).populate("movie theater");
    return show;
  } catch (err) {
    throw err;
  }
};
const createShow = async (showData) => {
  const { movieId, theaterId, showtime, price } = showData;
  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new Error("Movie not found");
    }

    const newShow = new Show({ movie, theater: theaterId, showtime, price });
    const savedShow = await newShow.save();
    return savedShow;
  } catch (err) {
    throw err;
  }
};

const updateShow = async (showId, updateData) => {
  try {
    const show = await Show.findByIdAndUpdate(showId, updateData, {
      new: true,
    }); // Return updated show
    if (!show) {
      throw new Error("Show not found");
    }
    return show;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getShows,
  getShowById,
  createShow,
  updateShow,
};
