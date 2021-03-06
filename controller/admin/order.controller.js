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
    //try {
    for (i = 0; i < orderlist.length; i++) {
      for (j = 0; j < orderlist[i].order.length; j++) {
        if (orderlist[i].order[j].orderStatus == "cooking") {
          // comingOrder.push(orderlist[i].order[j]);

          comingOrder.push({
            order: orderlist[i].order[j],
            tableNumber: orderlist[i].tableNumber,
          });
        }
      }
    }
    //console.log(comingOrder);
    comingOrder.sort((a, b) => {
      if (a.order.time == b.order.time) {
        return 0;
      }
      if (a.order.time > b.order.time) {
        return 1;
      }
      if (a.order.time < b.order.time) {
        return -1;
      }
    });
    res.status(200).json(comingOrder);
    //} catch (err) {}
  },
  updateFoodStatus: async (req, res) => {
    const { _id, foodStatus } = req.body;

    try {
      const orderlist = await Orderlists.findOne({
        order: { $elemMatch: { detail: { $elemMatch: { _id: _id } } } },
      });
      orderlist?.order.map((e) => {
        e.detail.map((_e) => {
          if (_e._id.toString() == _id) {
            _e.foodStatus = foodStatus;
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
  updateOrderStatus: async (req, res) => {
    const { _id, orderStatus } = req.body;

    try {
      const orderlist = await Orderlists.findOne({
        order: { $elemMatch: { _id: _id } },
      });
      orderlist?.order.map((e) => {
        if (e._id.toString() == _id) {
          e.orderStatus = orderStatus;
        }
      });
      if (orderlist) {
        await orderlist.save();
      }

      //console.log(orderlist);
      res.status(200).json(orderStatus);
    } catch (error) {
      console.log(error);
    }
  },
  seeItembyOrderId: async (req, res) => {
    const _id = req.params.id;
    var _order = [];
    try {
      const orderlist = await Orderlists.find({});
      orderlist?.map((e) => {
        e.order.map((_e) => {
          if (_e._id == _id) {
            _order.push(_e.detail);
          }
        });
      });
      // console.log(_id);
      res.status(200).send(_order);
    } catch (error) {
      console.log(error);
    }
  },
};
