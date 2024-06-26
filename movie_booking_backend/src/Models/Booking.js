const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', optional: true },
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  seats: { type: [String], required: true },
  bookingFee: { type: Number, default: 0 }, 
  totalPrice: { type: Number, required: true },
  status: { type: String, required: true, default: 'pending' }, 
  payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', optional: true }, 
});

module.exports = mongoose.model('Booking', bookingSchema);