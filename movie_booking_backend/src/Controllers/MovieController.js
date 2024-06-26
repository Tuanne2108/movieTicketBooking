const MovieService = require("../Services/MovieService");

const createMovie = async (req, res) => {
  try {
<<<<<<< HEAD
    const { title, description, actors, releaseDate, posterUrl, duration } = req.body;
    if (!title || !description || !actors || !releaseDate || !posterUrl || !duration) {
=======
    const {
      title,
      description,
      actors,
      releaseDate,
      posterUrl,
      duration,
      trailerUrl,
      typeOfMovie,
      country,
      director,
    } = req.body;
    if (
      !title ||
      !description ||
      !actors ||
      !releaseDate ||
      !posterUrl ||
      !duration ||
      !trailerUrl || !typeOfMovie || !country || !director
    ) {
>>>>>>> testAPI
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
<<<<<<< HEAD
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
=======
const getAllMovie = async (req, res) => {
  try {
    const response = await MovieService.getAllMovie();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
const getMovieById = async (req, res) => {
  try {
    const response = await MovieService.getMovieById(req.params.id);
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
      return res.status(400).json({
        status: "Error",
        message: "The id is required",
      });
    }
    const response = await MovieService.updateMovie(movieId, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};
>>>>>>> testAPI

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
const deleteAllMovies = async (req, res) => {
  try {
    const { ids } = req.body;
    const response = await MovieService.deleteAllMovies(ids);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
module.exports = {
  createMovie,
<<<<<<< HEAD
  updateMovie,
  deleteMovie,
  getMovie,
  getAllMovies,
=======
  getAllMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
>>>>>>> testAPI
};
