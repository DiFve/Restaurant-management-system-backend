const Orderlists = require("../../model/orderlist");
const Tables = require("../../model/table");
const Foods = require("../../model/food");
const Cart = require("../../model/cart");
module.exports = {
  seeOrderTable: async (req, res) => {
    const tableNumber = req.params.tableNumber;
    try {
      const table = await Tables.findOne({ tableNumber: tableNumber });
      const orderlist = await Orderlists.findById(table.orderList);
      res.status(200).json(orderlist);
    } catch (err) {}
  },
  inComingOrder: async (req, res) => {
    const orderlist = await Orderlists.find({});
    var comingOrder = [];
    try {
      for (i = 0; i < orderlist.length; i++) {
        for (j = 0; j < orderlist[i].order.length; j++) {
          for (k = 0; k < orderlist[i].order[j].detail.length; k++) {
            if (orderlist[i].order[j].detail[k].foodStatus == "cooking") {
              comingOrder.push(orderlist[i].order[j].detail[k]);
              console.log(k);
            }
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
      //console.log(comingOrder.length);
      res.status(200).json(comingOrder);
    } catch (err) {}
  },
  updateFoodStatus: async (req, res) => {
    const { _id, status } = req.body;

    try {
      const orderlist = await Orderlists.findOne({
        order: { $elemMatch: { detail: { $elemMatch: { _id: _id } } } },
      });
      orderlist?.order.map((e) => {
        e.detail.map((_e) => {
          if (_e._id.toString() == _id) {
            _e.foodStatus = status;
          }
        });
      });
      if (orderlist) {
        await orderlist.save();
      }

      //console.log(orderlist);
      res.status(200).json(orderlist);
    } catch (error) {
      console.log(error);
    }
  },
  addItemToOrder: async (req, res) => {
    const { detail } = req.body;
    const tableNumber = req.params.tableNumber;
    try {
      const table = await Tables.findOne({ tableNumber: tableNumber });
      const orderlist = await Orderlists.findByIdAndUpdate(table.orderList, {
        $push: { order: { detail: detail } },
      });
    } catch (err) {}
  },
};
