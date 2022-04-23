const Orderlists = require("../../model/orderlist");
const Tables = require("../../model/table");
const Foods = require("../../model/food");
const Cart = require("../../model/cart");

module.exports = {
  addItemToCart: async (req, res) => {
    const { orderID, detail } = req.body;
    const tableNumber = req.params.id;
    try {
      const table = await Tables.findOne({ tableNumber: tableNumber });
      // console.log(table.cart);
      // const item = await Cart.find({});
      // console.log(item);

      const newOrder = await Cart.findByIdAndUpdate(table.cart, {
        $push: { detail: detail },
      });
      res.status(200).send("add to cart");
      res.status(200).json(newOrder);
    } catch (err) {}

    //res.status(200).json(newOrder);
  },
  getAllItemInCart: async (req, res) => {
    const tableNumber = req.params.id;
    try {
      const table = await Tables.findOne({ tableNumber: tableNumber });
      // console.log(table.cart);
      // const item = await Cart.find({});
      // console.log(item);
      const newOrder = await Cart.findById(table.cart);
      //res.status(200).send("add to cart");
      res.status(200).json(newOrder);
    } catch (err) {}
  },
  deleteItemInCart: async (req, res) => {
    const { _id } = req.body;
    const tableNumber = req.params.id;
    try {
      const table = await Tables.findOne({ tableNumber: tableNumber });
      // console.log(table.cart);
      // const item = await Cart.find({});
      // console.log(item);
      const cart = await Cart.findById(table.cart);
      // const item = cart.find({
      //   detail: { $elemMatch: { _id: "62639d782eb3374a94c9f5e1" } },
      // });
      // cart.update(
      //   {'_id':ObjectId(_id)},
      //   {$pull:{}}

      // )
      //res.status(200).send("add to cart");
      res.status(200).json(cart);
    } catch (err) {}
  },
};
