const Orderlists = require("../../model/orderlist");
const Tables = require("../../model/table");
const Foods = require("../../model/food");
const Cart = require("../../model/cart");

module.exports = {
  addItemToCart: async (req, res) => {
    const { detail } = req.body;
    const tableNumber = req.params.tableNumber;
    try {
      const table = await Tables.findOne({ tableNumber: tableNumber });
      const food = await Foods.findById(detail.foodID);
      //res.status(400).json(food.status);
      // if (food.status == "OutofStock") {
      //   console.log(food.status);
      // }
      if (food.status == "InStock") {
        console.log(food.status);
        await Cart.findByIdAndUpdate(table.cart, {
          $push: { detail: detail },
        });
        res.status(200).send("add to cart");
      } else if (food.status == "OutofStock") {
        res.status(409).send("out od stock");
      }
    } catch (err) {}
  },
  getAllItemInCart: async (req, res) => {
    const tableNumber = req.params.tableNumber;
    try {
      const table = await Tables.findOne({ tableNumber: tableNumber });

      const newOrder = await Cart.findById(table.cart);

      res.status(200).json(newOrder);
    } catch (err) {}
  },
  deleteItemInCart: async (req, res) => {
    const { _id } = req.body;
    const tableNumber = req.params.tableNumber;
    try {
      const table = await Tables.findOne({ tableNumber: tableNumber });

      const cart = await Cart.findByIdAndUpdate(table.cart, {
        $pull: { detail: { _id: _id } },
      });

      res.status(200).json({ message: "delete  success" });
    } catch (err) {}
  },
  confirmItemInCart: async (req, res) => {
    const tableNumber = req.params.tableNumber;
    try {
      const table = await Tables.findOne({ tableNumber: tableNumber });

      const thisCart = await Cart.findById(table.cart);

      const thisOrderList = await Orderlists.findByIdAndUpdate(
        table.orderList,
        { $push: { order: thisCart.detail } }
      );

      await Cart.findByIdAndUpdate(table.cart, { detail: [] });
      res.status(200).json({ message: "success " });
    } catch (error) {}
  },
};
