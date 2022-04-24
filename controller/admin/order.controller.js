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
    //const order = await Orderlists.findOneAndUpdate({ _id: _id }, { order: {order:{detail: }} });
    //const order = await Orderlists.findById(_id);
    //console.log(order.order[0].detail);

    const orderlist = await Orderlists.find({});
    var edit = orderlist[0].order;
    for (i = 0; i < orderlist.length; i++) {
      for (j = 0; j < orderlist[i].order.length; j++) {
        for (k = 0; k < orderlist[i].order[j].detail.length; k++) {
          if (orderlist[i].order[j].detail[k]._id == _id) {
            orderlist[i].order[j].detail[k].foodStatus = "success";

            //console.log(orderlist[i].order[j].detail[k]);
            orderID = orderlist[i]._id;
            break;
          }
        }
      }
    }
    console.log(edit);
    const test = await Orderlists.findByIdAndUpdate(orderID);
    console.log(test);
    //console.log(orderID);
    res.status(200).json(orderlist);
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
