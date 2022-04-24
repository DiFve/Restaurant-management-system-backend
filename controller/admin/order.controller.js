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
    for (i = 0; i < orderlist.length; i++) {
      for (j = 0; j < orderlist[i].order.length; j++) {
        for (k = 0; k < orderlist[i].order[j].detail.length; k++) {
          if (orderlist[i].order[j].detail[k].foodStatus == "cooking") {
            comingOrder.push(orderlist[i].order[j]);
            console.log(orderlist[i].order[j].detail[k]);
          }
        }
      }
    }
    res.status(200).json(comingOrder);
  },
  updateFoodStatus: async (req, res) => {
    const { _id, status } = req.body;
    //const order = await Orderlists.findOneAndUpdate({ _id: _id }, { order: {order:{detail: }} });
    //const order = await Orderlists.findById(_id);
    //console.log(order.order[0].detail);
    try {
      const orderlist = await Orderlists.findOneAndUpdate({
        order: { $elemMatch: { detail: { $elemMatch: { _id: _id } } } },
        $set: { "order.$[].detail.$[foodStatus]": status },
        arrayFilters: [{ foodStatus: "foodStatus" }],
      });
      console.log(orderlist);
      res.status(200).json(orderlist);
    } catch (error) {
      console.log(error);
    }

    // for (i = 0; i < orderlist.length; i++) {
    //   for (j = 0; j < orderlist[i].order.length; j++) {
    //     for (k = 0; k < orderlist[i].order[j].detail.length; k++) {
    //       if (orderlist[i].order[j].detail[k]._id == _id) {
    //         orderlist[i].order[j].detail[k].foodStatus = "success";

    //         //console.log(orderlist[i].order[j].detail[k]);
    //         //edit = orderlist[i].order[j].order;
    //         orderID = orderlist[i]._id;
    //         break;
    //       }
    //     }
    //   }
    // }

    //console.log(orderID);
  },
};
