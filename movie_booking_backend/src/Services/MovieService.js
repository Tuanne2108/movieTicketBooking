const Movie = require("../Models/Movie");
<<<<<<< HEAD

const createMovie = (newMovie) => {
  return new Promise(async (resolve, reject) => {
    const { title, description, actors, releaseDate, posterUrl, duration } =
      newMovie;
=======
const createMovie = (newMovie) => {
  return new Promise(async (resolve, reject) => {
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
    } = newMovie;
>>>>>>> testAPI
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
<<<<<<< HEAD
=======
        trailerUrl,
        typeOfMovie,
        country,
        director,
>>>>>>> testAPI
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

<<<<<<< HEAD
const updateMovie = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkMovie = await Movie.findOne({ _id: id });

      if (!checkMovie) {
        reject({
          status: "Error",
          message: "The movie does not exist",
        });
      }
      const updatedMovie = await Movie.findByIdAndUpdate(id, data, {
        new: true,
      });
      resolve({
        status: "Success",
        message: "Movie updated successfully",
        data: updatedMovie,
      });
    } catch (error) {
      reject(error);
    }
  });
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
const getMovie = (id) => {
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
const getAllMovies = () => {
=======
const getAllMovie = () => {
>>>>>>> testAPI
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
<<<<<<< HEAD
module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovie,
  getAllMovies,
=======
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
>>>>>>> testAPI
};
