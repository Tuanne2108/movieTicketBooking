const Movie = require("../Models/Movie");

const createMovie = (newMovie) => {
  return new Promise(async (resolve, reject) => {
    const { title, description, actors, releaseDate, posterUrl, duration } =
      newMovie;
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
module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovie,
  getAllMovies,
};
