const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
<<<<<<< HEAD
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actors: [{ type: String, required: true }],
  releaseDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  duration:{
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
=======
  title: { type: String, required: true },
  description: { type: String, required: true },
  actors: { type: [String], required: true },
  releaseDate: { type: Date, required: true },
  posterUrl: { type: String, required: true },
  duration: { type: Number, required: true },
  trailerUrl: { type: String, required: true },
  typeOfMovie: { type: String, required: true },
  country: { type: String, required: true },
  director: { type: [String], required: true },
>>>>>>> testAPI
});

module.exports = mongoose.model("Movie", movieSchema);
