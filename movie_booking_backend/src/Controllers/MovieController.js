const MovieService = require("../Services/MovieService");

const createMovie = async (req, res) => {
  try {
    const { title, description, actors, releaseDate, posterUrl, duration } = req.body;
    if (!title || !description || !actors || !releaseDate || !posterUrl || !duration) {
      return res.status(200).json({
        status: "Error",
        message: "The input is required",
      });
    }
    const response = await MovieService.createMovie(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
  const updateMovie = async (req, res) => {
    try {
      const movieId = req.params.id;
      const data = req.body;
      if (!movieId) {
        return res.status(200).json({
          status: "Error",
          message: "The id is required",
        });
      }
      const response = await MovieService.updateMovie(movieId, data);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        message: error,
      });
    }
  };
  const deleteMovie = async (req, res) => {
    try {
      const movieId = req.params.id;
      if (!movieId) {
        return res.status(200).json({
          status: "Error",
          message: "The id is required",
        });
      }
      const response = await MovieService.deleteMovie(movieId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        message: error,
      });
    }
  };
  const getMovie = async (req, res) => {
    try {
      const movieId = req.params.id;
      if (!movieId) {
        return res.status(200).json({
          status: "Error",
          message: "The id is required",
        });
      }
      const response = await MovieService.getMovie(movieId);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        message: error,
      });
    }
  };
  const getAllMovies = async (req, res) => {
    try {
      const response = await MovieService.getAllMovies();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({
        message: error,
      });
    }
  };

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovie,
  getAllMovies,
};
