const mongoose = require("mongoose");

const foodtypeSchema = new mongoose.Schema({
  type: [{ type: String }],
});

const model = mongoose.model("foodtypes", foodtypeSchema);

module.exports = model;
