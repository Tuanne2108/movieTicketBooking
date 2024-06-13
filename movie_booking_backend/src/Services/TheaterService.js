const Theater = require("../Models/Theater");

const createTheater = (newTheater) => {
  return new Promise(async (resolve, reject) => {
    const { name, location } = newTheater;
    try {
      const checkTheater = await Theater.findOne({ name: name });
      if (checkTheater) {
        reject({
          status: "Error",
          message: "Theater already exists",
        });
      }
      const createdTheater = await Theater.create({
        name,
        location,
      });
      if (createdTheater) {
        resolve({
          status: "Success",
          message: "Theater created successfully",
          data: createdTheater,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllTheaters = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const theaters = await Theater.find();
      resolve({
        status: "Success",
        message: "Theaters fetched successfully",
        data: theaters,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getTheaterById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const theater = await Theater.findById(id);
      resolve({
        status: "Success",
        message: "Theater fetched successfully",
        data: theater,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateTheater = async (id, updatedTheater) => {
  try {
    const checkTheater = await Theater.findOne({ _id: id });

    if (!checkTheater) {
      throw {
        status: "Error",
        message: "The theater does not exist",
      };
    }

    const updatedTheaterData = await Theater.findByIdAndUpdate(id, updatedTheater, {
      new: true,
    });

    return {
      status: "Success",
      message: "Theater updated successfully",
      data: updatedTheaterData,
    };
  } catch (error) {
    throw error;
  }
};

const deleteTheater = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Theater.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "Theater deleted successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};


module.exports = {
  createTheater,
  getAllTheaters,
  getTheaterById,
  updateTheater,
  deleteTheater,
};
