const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  foodName: { type: String, required: true, trim: true },
  type: {
    type: String,
    enum: ["pork", "beef", "chicken", "drink", "seafood", "etc"],
    required: true,
  },
  image: {
    type: String,
  },
  foodType: {
    type: String,
    enum: ["buffet", "a-la-carte", "buffet a-la-carte"],
  },
  description: {
    type: String,
  },
  detail: [
    {
      topicName: Object,
      choice: Object,
      option: [],
      additionalPrice: [[{ type: Number }]],
      require: Object,
    },
  ],
  price: { type: Number, required: true },
});

const model = mongoose.model("foods", foodSchema);

module.exports = model;
