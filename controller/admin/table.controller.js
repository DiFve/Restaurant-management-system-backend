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
        callEmployee: false,
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
    /////////
  },
  deleteTable: async (req, res) => {
    const id = req.params.id;
    try {
      const data = await Tables.findByIdAndRemove(id);
      res.status(200).json(data);
    } catch (error) {}
  },
  addBuffetPrice: async (req, res) => {
    try {
      const table = await Tables.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(table);
    } catch (error) {}
  },
  pushCallEmployee: async (req, res) => {
    try {
      const tableNumber = req.body.tableNumber;
      const table = await Tables.findOneAndUpdate(
        { tableNumber: tableNumber },
        {
          $set: {
            callEmployee: true,
          },
        }
      );
      console.log(table);
      res.status(200).json({ messaage: "call employee logged" });
    } catch (error) {
      console.log(error);
      res.status(200).json({ message: error });
    }
  },
  cancelCallEmployee: async (req, res) => {
    try {
      const tableNumber = req.body.tableNumber;
      const table = await Tables.findOneAndUpdate(
        { tableNumber: tableNumber },
        {
          $set: {
            callEmployee: false,
          },
        }
      );
      // console.log(table);
      res.status(200).json({ messaage: "call employee canceled" });
    } catch (error) {
      //console.log(error);
      res.status(200).json({ message: error });
    }
  },
  cashOutTable: async (req, res) => {
    try {
      const table = await Tables.findOne({
        tableNumber: req.params.tableNumber,
      });
      const orderlist = await Orderlists.findById(table.orderList);

      var item = [];
      var totalPrice = 0;
      var data = {};
      orderlist?.order.map((e) => {
        e.detail.map((_e) => {
          if (_e.foodStatus != "fail") {
            item.push(_e);
            console.log(_e);
            totalPrice += _e.price;
          }
        });
      });
      if (table.tableType == "buffet") {
        totalPrice = table.buffetPrice * table.personAmount;
        data = {
          detail: item,
          totalPrice: totalPrice,
          buffetPrice: table.buffetPrice,
          personAmount: table.personAmount,
        };
      } else {
        data = {
          detail: item,
          totalPrice: totalPrice,
          //buffetPrice: table.buffetPrice,
        };
      }

      // await Orderlists.findByIdAndUpdate(table.orderList, {
      //   $set: { order: [] },
      // });

      console.log(totalPrice);
      res.status(200).json(data);
    } catch (error) {}
  },
  confirmCashOut: async (req, res) => {
    try {
      const table = await Tables.findOne({
        tableNumber: req.params.tableNumber,
      });
      await Orderlists.findByIdAndUpdate(table.orderList, {
        $set: { order: [] },
      });
      await Tables.findOneAndUpdate(
        {
          tableNumber: req.params.tableNumber,
        },
        { status: "available" }
      );
    } catch (error) {}
  },
};
