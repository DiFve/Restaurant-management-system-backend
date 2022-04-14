const { default: mongoose } = require("mongoose");
const Orderlists = require("../../model/orderlist");
const Tables = require("../../model/table");
const toID = mongoose.Types.ObjectId;
module.exports = {
  makeTable: async (req, res) => {
    const { tableNumber, tableType, orderList } = req.body;

    try {
      const orderlist = await Orderlists.create({
        foodID: orderList.foodID,
        quantity: orderList.quantity,
        foodStatus: orderList.foodStatus,
      });
      console.log(orderlist._id);
      const table = await Tables.create({
        tableNumber: tableNumber,
        tableType: tableType,
        orderList: orderlist._id,
      });
      console.log(table);

      res.status(200).json({ message: "Table created" });
    } catch (error) {
      console.log(error);
    }
  },
  seeTable: async (req, res) => {
    const table = await Tables.find({}).populate({ path: "orderList" });
    res.status(200).json(table);
  },
};
