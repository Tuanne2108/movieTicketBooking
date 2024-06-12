const Theater = require('../models/Theater');

const getTheaters = async () => {
  try {
    const theaters = await Theater.find();
    return theaters;
  } catch (err) {
    throw err;
  }
};

const getTheaterById = async (theaterId) => {
  try {
    const theater = await Theater.findById(theaterId);
    return theater;
  } catch (err) {
    throw err;
  }
};
const createTheater = async (theaterData) => {
    try {

      const newTheater = new Theater(theaterData);
      const savedTheater = await newTheater.save();
      return savedTheater;
    } catch (err) {
      throw err;
    }
  };
  
const updateTheater = async (theaterId, updateData) => {
    try {
      const theater = await Theater.findByIdAndUpdate(theaterId, updateData, { new: true }); 
      if (!theater) {
        throw new Error('Theater not found');
      }
      return theater;
    } catch (err) {
      throw err;
    }
  };
  
module.exports = {
    getTheaters,
    getTheaterById,
    createTheater,
    updateTheater,
  };
