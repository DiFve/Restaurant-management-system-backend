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

      if (food.status == "InStock") {
        console.log(food.status);
        await Cart.findByIdAndUpdate(table.cart, {
          $push: { detail: detail },
        });
        res.status(200).send("add to cart");
      } else if (food.status == "OutofStock") {
        res.status(409).send("out of stock");
      }
    } catch (err) {
      res.status(404).send("error");
    }
  },
  getAllItemInCart: async (req, res) => {
    const tableNumber = req.params.tableNumber;
    try {
      const table = await Tables.findOne({ tableNumber: tableNumber });

      const newOrder = await Cart.findById(table.cart);

      res
        .status(200)
        .json(newOrder)
        .header({
          "Access-Control-Allow-Origin": [
            "http://localhost:3000",
            "https://frontend.manhermak.com",
          ],
        });
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
      if (thisCart.detail.length === 0) {
        return res.status(409).json({ message: "no item in cart" });
      }
      //thisCart.tableNumber = tableNumber;
      order = await Orderlists.findByIdAndUpdate(table.orderList, {
        $push: { order: thisCart },
      });

      await Cart.findByIdAndUpdate(table.cart, { detail: [] });
      res.status(200).json({ message: "success " });
    } catch (error) {}
  },
};
