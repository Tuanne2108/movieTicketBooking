const Seat = require("../Models/Seat");
const Show = require("../Models/Show");
const createSeat = (newSeat) => {
  return new Promise(async (resolve, reject) => {
    const { show, row, number, type, status } = newSeat;
    try {
      const showExists = await Show.findById(show);

      if (!showExists) {
        return reject({
          status: "Error",
          message: "Invalid Show",
        });
      }

      const createdSeat = await Seat.create({
        show,
        row,
        number,
        type,
        status,
      });
      if (createdSeat) {
        resolve({
          status: "Success",
          message: "Seat created successfully",
          data: createdSeat,
        });
      }
    } catch (error) {
      reject({
        status: "Error",
        message: error.message || "An error occurred",
      });
    }
  });
};
const getAllSeats = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const seats = await Seat.find().populate('show');
      resolve({
        status: "Success",
        message: "Seats fetched successfully",
        data: seats,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getSeatById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const seat = await Seat.findById(id).populate('show');
      resolve({
        status: "Success",
        message: "Seat fetched successfully",
        data: seat,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateSeat = async (id, updatedSeat) => {
  try {
    const checkSeat = await Seat.findOne({ _id: id });

    if (!checkSeat) {
      throw {
        status: "Error",
        message: "The seat does not exist",
      };
    }

    const updatedSeatData = await Seat.findByIdAndUpdate(id, updatedSeat, {
      new: true,
    });

    return {
      status: "Success",
      message: "Seat updated successfully",
      data: updatedSeatData,
    };
  } catch (error) {
    throw error;
  }
};

const deleteSeat = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Seat.findByIdAndDelete(id);
      resolve({
        status: "Success",
        message: "Seat deleted successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createSeat,
  getAllSeats,
  getSeatById,
  updateSeat,
  deleteSeat,
};
