const mongoose = require("mongoose");

const orderlistSchema = new mongoose.Schema([
  {
    foodID: { type: String },
    image: {
      type: String,
    },
    quantity: { type: Number, default: 0 },
    detail: [
      {
        topicName: Object,
        choice: Object,
        option: [],
        additionalPrice: [[{ type: Number }]],
        require: Object,
      },
    ],
    foodStatus: { type: String, enum: ["success", "fail"] },
  },
]);

const Orderlists = mongoose.model("orderlists", orderlistSchema);

module.exports = Orderlists;
