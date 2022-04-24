const mongoose = require("mongoose");

const orderlistSchema = new mongoose.Schema({
  tableNumber: { type: Number },
  order: [
    {
      detail: [
        {
          foodID: { type: String },
          foodName: { type: String },
          price: Number,
          quantity: { type: Number, default: 0 },
          additionalInfo: { type: String },
          time: { type: Date, default: Date.now },
          foodStatus: {
            type: String,
            enum: ["complete", "cooking", "fail"],
            default: "cooking",
          },
          detail: [
            {
              topicName: String,
              option: [String],
            },
          ],
        },
      ],
      totalPrice: Number,
      time: { type: Date, default: Date.now },
      orderStatus: {
        type: String,
        enum: ["complete", "cooking"],
        default: "cooking",
      },
    },
  ],
});

const Orderlists = mongoose.model("orderlists", orderlistSchema);

module.exports = Orderlists;
