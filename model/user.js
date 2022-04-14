const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "customer", "employee"],
  },
  foodType: { type: String, enum: ["buffet", "a-la-carte"] },
  table: { type: Number },
  token: { type: String },
});

const model = mongoose.model("users", userSchema);

module.exports = model;
