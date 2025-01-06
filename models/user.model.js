const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationDate: { type: String, default: Date.now() },
});
const userModel = mongoose.model("user_data", userSchema);
module.exports = userModel;
