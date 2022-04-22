const { register } = require("./login.controller");
const { makeTable } = require("./table.controller");
const Tables = require("../../model/table");
const qr = require("qrcode");
require("dotenv").config;
module.exports = {
  makeTableForCustomer: async (req, res) => {
    //makeTable(req, res);
    const { tableNumber, tableType, personAmount } = req.body;
    try {
      const table = await Tables.findOneAndUpdate(
        { tableNumber: tableNumber },
        { tableType: tableType, personAmount: personAmount, status: "busy" }
      );

      req.body.foodType = req.body.tableType;
      req.body.table = req.body.tableNumber;
      const email = `table${req.body.tableNumber}@restauraunt.com`;
      const password = `${Date.now()}-table${req.body.tableNumber}-${
        process.env.PASSWORD_KEY
      }`;
      req.body.email = email;
      req.body.password = password;
      const token = await register(req, res);

      const url = `https://frontend.manhermak.com/auth/${token}`;
      await qr.toFile(
        `./public/images/qrcode/table${req.body.table}.png`,
        url,
        (err, src) => {
          if (err) {
            res.status(500).json({ message: "something went wrong" });
          }
        }
      );

      return res.status(200).json({
        message: "Table created",
        qrImage: `images/qrcode/table${req.body.table}.png`,
      });
    } catch (error) {}
  },
};
