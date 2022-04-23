const mongoose = require("mongoose");
const { Schema } = mongoose;
const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
  tableType: {
    type: String,
    required: true,
    enum: ["buffet", "a-la-carte", "none"],
  },
  orderList: { type: Schema.Types.ObjectId, ref: "orderlists" },
  cart: { type: Schema.Types.ObjectId, ref: "cart" },
  status: { type: String, enum: ["available", "busy"] },
  personAmount: { type: Number },
});

const model = mongoose.model("tables", tableSchema);

module.exports = model;
