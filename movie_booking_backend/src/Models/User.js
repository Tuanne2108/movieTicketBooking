const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmedPassword: {
    type: String,
    minLength: 8,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;