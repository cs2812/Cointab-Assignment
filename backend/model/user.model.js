const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  wrongAttempt: { type: Number, default: 0 },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
