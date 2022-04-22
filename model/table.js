const mongoose = require("mongoose");
const Orderlists = require("./orderlist");
const { Schema } = mongoose;
const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, required: true, unique: true },
<<<<<<< HEAD
  tableType: { type: String, required: true, enum: ["buffet", "a-la-carte"] },

=======
  tableType: {
    type: String,
    required: true,
    enum: ["buffet", "a-la-carte", "none"],
  },
>>>>>>> 3f814f8c8e7b74dd8026d402994944ae0c909bbb
  orderList: { type: Schema.Types.ObjectId, ref: "orderlists" },
  status: { type: String, enum: ["available", "busy"] },
  personAmount: { type: Number },
});

const model = mongoose.model("tables", tableSchema);

module.exports = model;
