const mongoose = require("mongoose");

const orderlistSchema = new mongoose.Schema({
  detail: [
    {
      foodID: { type: String },
      quantity: { type: Number, default: 0 },
      foodStatus: {
        type: String,
        enum: ["success", "cooking", "fail"],
        default: "cooking",
      },

      time: { type: Date, default: Date.now },
      detail: [
        {
          topicName: [String],
          choice: [String],
          option: [String],
          Price: Number,
        },
      ],
      //timestamps: true,
    },
    {},
  ],
});

const Orderlists = mongoose.model("orderlists", orderlistSchema);

module.exports = Orderlists;
