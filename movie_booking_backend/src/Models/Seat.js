const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  show: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
  number: { type: [String], required: true },
  booked: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Seat", seatSchema);
