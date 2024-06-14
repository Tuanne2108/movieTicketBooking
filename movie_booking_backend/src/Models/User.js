const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String , optional:true},
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
