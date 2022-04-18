const Orderlists = require("../../model/orderlist");
const Tables = require("../../model/table");

module.exports = {
  makeTable: async (req, res) => {
    const { tableNumber, tableType, orderList } = req.body;
    console.log(orderList);
    try {
      const orderlist = await Orderlists.create({
        detail: orderList,
      });
      const table = await Tables.create({
        tableNumber: tableNumber,
        tableType: tableType,
        orderList: orderlist._id,
      });
      return res.status(200).send("tableNumber");
    } catch (error) {
      return console.log(error);
    }
  },
  seeTable: async (req, res) => {
    const table = await Tables.find({}).populate({ path: "orderList" });
    res.status(200).json(table);
  },
  addOrderlist: async (req, res) => {
    const { orderID, detail } = req.body;
    const id = req.params.id;
    const table = await Tables.findOne({ tableNumber: id });
    const { tableNumber, tableType, orderList } = table;
    console.log(table.orderList);
    try {
      const orderDetail = await Orderlists.findById(orderList);
      //const { orderID, detail } = orderDetail;
      const newOrder = await Orderlists.findByIdAndUpdate(orderList._id, {
        $push: { detail: detail },
      });
      console.log(newOrder);
      res.status(200).json(newOrder);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
};
