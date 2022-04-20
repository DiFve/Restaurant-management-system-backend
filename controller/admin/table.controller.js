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
  seeTableByID: async (req, res) => {
    const _id = req.params.id;
    try {
      const data = await Tables.findById(_id).populate({
        path: "orderList",
      });
      res.status(200).json(data);
    } catch (error) {}
  },
  //order
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
      res.status(200).json({ message: "OrderCreated" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  seeOrderTable: async (req, res) => {
    const id = req.params.id;
    const table = await Tables.findOne({ tableNumber: id });
    try {
      const order = await Orderlists.findById(table.orderList);
      console.log(order.detail);
      res.status(200).json(order.detail);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  inComingOrder: async (req, res) => {
    try {
      const order = await Orderlists.find({});
      var comingOrder = [];
      for (i = 0; i < order.length; i++) {
        for (j = 0; j < order[i].detail.length; j++) {
          console.log(order[i].detail[j].foodStatus);
          if (order[i].detail[j].foodStatus === "cooking") {
            comingOrder.push(order[i].detail[j]);
          }
        }
      }
      comingOrder.sort((a, b) => {
        if (a.time < b.time) {
          return 1;
        }
        if (a.time > b.time) {
          return -1;
        }
        return 0;
      });
      console.log(comingOrder);
      res.status(200).json(comingOrder);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
};
