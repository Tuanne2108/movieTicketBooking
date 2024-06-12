const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
  time: { 
    type: String, 
    required: true, 
  },  
  theater: { 
    type: String, 
    required: true,
  },
  availableSeats: { 
    type: Number, 
    required: true,
  },
});

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  actors: { type: [String], required: true },
  releaseDate: { type: Date, required: true },
  posterUrl: { type: String, required: true },
  duration: { type: Number, required: true },
  showtimes: { type: [showtimeSchema], required: true },
});

module.exports = mongoose.model('Movie', movieSchema);
