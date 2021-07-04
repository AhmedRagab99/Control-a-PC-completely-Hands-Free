const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: [6, "name must be at least 6 chars"],
    max: [10, "name must be at most 10 chars"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: false,
    default: Date.now,
  },
});

// validation and save password

const User = mongoose.model("User", userSchema);
module.exports = User;
