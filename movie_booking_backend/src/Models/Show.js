const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    theater: { type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true },
    date: { type: Date, required: true }, 
    time: { type: String, required: true, format: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/ },
    price: { type: Number, required: true }, 
  });

  module.exports = mongoose.model('Show', showSchema);