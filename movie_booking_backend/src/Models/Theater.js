const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  numberOfSeats: { type: Number, required: true},
});

module.exports = mongoose.model('Theater', theaterSchema);