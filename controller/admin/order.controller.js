const { default: mongoose } = require("mongoose");
const Table = require("../../model/table");
const Orderlists = require("../../model/orderlist");
const model = require("../../model/food");
const toID = mongoose.Types.Orderlists;
module.exports = {
  makeOrderLists: async (req, res) => {
    //const { tableNumber, tableType, orderList } = req.body;
    const tableNumber = req.params.id;
    try {
      const table = await Table.findOne({ tableNumber: tableNumber }).populate({
        path: "orderList",
      });
      res.status(200).json({ table });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
};
