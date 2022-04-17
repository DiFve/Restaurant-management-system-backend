const mongoose = require("mongoose");

const orderlistSchema = new mongoose.Schema({
  detail: [
    {
      foodID: { type: String },
      quantity: { type: Number, default: 0 },
      foodStatus: { type: String, enum: ["success", "fail"] },
    },
  ],
});

const Orderlists = mongoose.model("orderlists", orderlistSchema);

module.exports = Orderlists;
