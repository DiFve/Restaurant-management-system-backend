const mongoose = require("mongoose");

const orderlistSchema = new mongoose.Schema({
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
            enum: ["success", "cooking", "fail"],
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
      tableNumber: { type: Number },
      time: { type: Date, default: Date.now },
      orderStatus: {
        type: String,
        enum: ["compleate", "working"],
        default: "working",
      },
    },
  ],
});

const Orderlists = mongoose.model("orderlists", orderlistSchema);

module.exports = Orderlists;
