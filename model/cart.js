const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  detail: [
    {
      foodID: { type: String },

      quantity: { type: Number, default: 0 },
      time: { type: Date, default: Date.now },
      detail: [
        {
          topicName: [String],
          option: [String],
          Price: Number,
        },
      ],
    },
  ],
});

const Cartlists = mongoose.model("cart", cartSchema);

module.exports = Cartlists;
