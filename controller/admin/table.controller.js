const Orderlists = require("../../model/orderlist");
const Tables = require("../../model/table");
const Foods = require("../../model/food");
const Cart = require("../../model/cart");

module.exports = {
  makeTable: async (req, res) => {
    const { tableNumber, tableType, orderList, cart, status } = req.body;
    try {
      const cart = await Cart.create({ tableNumber: tableNumber });
      const orderlist = await Orderlists.create({
        tableNumber: tableNumber,
      });

      const table = await Tables.create({
        tableNumber: tableNumber,
        tableType: tableType,
        orderList: orderlist._id,
        cart: cart._id,
        status: status,
      });
      return res.status(200).send("tableCreate");
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
  deleteTable: async (req, res) => {
    const id = req.params.id;
    try {
      const data = await Tables.findByIdAndRemove(id);
      res.status(200).json(data);
    } catch (error) {}
  },
  //order

  addOrder: async (req, res) => {
    const { orderID, detail } = req.body;
    const id = req.params.id;
    const table = await Tables.findOne({ tableNumber: id });
    const { tableNumber, tableType, orderList } = table;
    console.log(table.orderList);
    try {
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
    var orderTable = [];
    try {
      const _order = await Orderlists.findById(table.orderList);
      const order = await Orderlists.findOne({ ontime: "now" });
      for (i = 0; i < order.detail.length; i++) {
        var _food = await Foods.findById(order.detail[i].foodID);
        var _product = JSON.stringify(order.detail[i]) + JSON.stringify(_food);
        var product = JSON.parse(product);
        console.log(product);
        orderTable.push(product);
      }
      res.status(200).json(orderTable);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  inComingOrder: async (req, res) => {
    try {
      const _order = await Orderlists.find({});
      const order = await Orderlists.findOne({ ontime: "now" });
      var comingOrder = [];
      for (i = 0; i < order.length; i++) {
        for (j = 0; j < order[i].detail.length; j++) {
          console.log(order[i].detail[j].foodStatus);
          if (order[i].detail[j].foodStatus === "cooking") {
            var _food = await Foods.findById(order[i].detail[j].foodID);
            comingOrder.push(order[i].detail[j] + _food);
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
  cashTable: async (req, res) => {
    try {
      const id = req.params.id;
      const table = await Tables.findOne({ tableNumber: id });
      var money = 0;
      order = await Orderlists.findById(table.orderList);
      const food = await Foods.find({});
      for (i = 0; i < order.detail.length; i++) {
        money = money + order.detail[i].Price;
      }

      res.status.json(money);
    } catch (error) {}
  },
};
