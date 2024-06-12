const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  row: { type: Number, required: true },
  number: { type: Number, required: true },
  type: { type: String, required: true }, 
  status: { type: String, required: true, default: 'available' },
});

module.exports = mongoose.model('Seat', seatSchema);