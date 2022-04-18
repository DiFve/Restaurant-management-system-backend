const Orderlists = require("../../model/orderlist");
const Tables = require("../../model/table");

module.exports = {
  makeTable: async (req, res) => {
    const { tableNumber, tableType, orderList } = req.body;
    console.log(orderList);
    try {
      // const orderlist = await Orderlists.create({
      //   foodID: orderList.foodID,
      //   quantity: orderList.quantity,
      //   foodStatus: orderList.foodStatus,
      // });
      // console.log(orderList);
      const orderlist = await Orderlists.create({
        detail: orderList,
      });
      // // console.log(orderlist._id);
      const table = await Tables.create({
        tableNumber: tableNumber,
        tableType: tableType,
        orderList: orderlist._id,
      });
      //console.log(table);

      //return res.status(200).json({ message: "Table created" });
      return res.status(200).send("tableNumber");
      return;
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
    try {
      const orderDetail = await Orderlists.findById(orderID);
      console.log(orderDetail);
      await Orderlists.findByIdAndUpdate(orderID, {
        $push: { detail: detail },
      });
      res.status(200).json(orderDetail);
    } catch (error) {}
  },
};
