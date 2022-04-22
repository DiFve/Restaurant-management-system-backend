const mongoose = require("mongoose");
const Orderlists = require("./orderlist");
const { Schema } = mongoose;
const tableSchema = new mongoose.Schema({
<<<<<<< HEAD
  tableNumber: { type: Number, required: true },
  tableType: {
    type: String,
    required: true,
    enum: ["buffet", "a-la-carte", "none"],
  },
=======
  tableNumber: { type: Number, required: true, unique: True },
  tableType: { type: String, required: true, enum: ["buffet", "a-la-carte"] },

>>>>>>> 8549d9704b6feff0ebb968b972607d3e11d5504f
  orderList: { type: Schema.Types.ObjectId, ref: "orderlists" },
  status: { type: String, enum: ["available", "busy"] },
  personAmount: { type: Number },
});

const model = mongoose.model("tables", tableSchema);

module.exports = model;
