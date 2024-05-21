const Movie = require("../Models/Movie");
const createMovie = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve({});
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

module.exports = {
  createMovie,
  getAllMovie,
};
