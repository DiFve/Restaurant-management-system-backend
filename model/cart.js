const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  order: [
    {
      detail: [
        {
          foodID: { type: String },
          quantity: { type: Number, default: 0 },
          time: { type: Date, default: Date.now },
          foodStatus: {
            type: String,
            enum: ["success", "cooking", "fail"],
            default: "cooking",
          },
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
    },
  ],
  orderStatus: {
    type: String,
    enum: ["success", "cooking", "fail"],
    default: "cooking",
  },
});

const Cartlists = mongoose.model("orderlists", cartSchema);

module.exports = Cartlists;
