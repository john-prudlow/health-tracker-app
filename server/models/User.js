const mongoose = require('mongoose');

// Define the schema for Users
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    }
  },
  { timestamps: true } // adds createdAt + updatedAt automatically
);

const User = mongoose.model("User", userSchema);

module.exports = User;