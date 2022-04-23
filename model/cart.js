const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  detail: [
    {
      foodID: { type: String },
      tableNumber: { type: Number, required: true },
      quantity: { type: Number, default: 0 },
      time: { type: Date, default: Date.now },
      detail: [
        {
          topicName: [String],
          choice: [String],
          option: [String],
          Price: Number,
        },
      ],
    },
  ],
});

const Cartlists = mongoose.model("cart", cartSchema);

module.exports = Cartlists;
