const Movie = require("../Models/Movie");
const createMovie = (newMovie) => {
  return new Promise(async (resolve, reject) => {
    const { title, description, actors, releaseDate, posterUrl, duration, trailerUrl } = newMovie;
    try {
      const checkMovie = await Movie.findOne({ title: title });
      if (checkMovie) {
        reject({
          status: "Error",
          message: "Movie already exists",
        });
      }
      const createdMovie = await Movie.create({
        title,
        description,
        actors,
        releaseDate,
        posterUrl,
        duration,
        trailerUrl,
      });
      if (createdMovie) {
        resolve({
          status: "Success",
          message: "Movie created successfully",
          data: createdMovie,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllMovie = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const movies = await Movie.find();
      resolve({
        status: "Success",
        message: "Movies fetched successfully",
        data: movies,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const getMovieById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const movie = await Movie.findById(id);
      resolve({
        status: "Success",
        message: "Movie fetched successfully",
        data: movie,
      });
    } catch (error) {
      reject(error);
    }
  });
};
const updateMovie = async (id, updatedMovie) => {
  try {
    const checkMovie = await Movie.findOne({ _id: id });

    if (!checkMovie) {
      throw {
        status: "Error",
        message: "The movie does not exist",
      };
    }

    const updatedMovieData = await Movie.findByIdAndUpdate(id, updatedMovie, {
      new: true,
    });

    return {
      status: "Success",
      message: "Movie updated successfully",
      data: updatedMovieData,
    };
  } catch (error) {
    throw error;
  }
};

const deleteMovie = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Movie.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "Movie deleted successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};
const deleteAllMovies = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Movie.deleteMany({ _id: { $in: ids } });
      resolve({
        status: "Success",
        message: "All movies deleted successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createMovie,
  getAllMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
};
