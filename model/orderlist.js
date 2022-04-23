const mongoose = require("mongoose");

const orderlistSchema = new mongoose.Schema({
  order: [
    {
      detail: [
        {
          foodID: { type: String },
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
              topicName: [String],
              choice: [String],
              option: [String],
              Price: Number,
            },
          ],
        },
      ],
      // orderStatus: {
      //   type: String,
      //   enum: ["success", "cooking", "fail"],
      //   default: "cooking",
      // },
    },
  ],
});

const Orderlists = mongoose.model("orderlists", orderlistSchema);

module.exports = Orderlists;
