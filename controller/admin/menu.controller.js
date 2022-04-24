const Foods = require("../../model/food");
const Foodtypes = require("../../model/foodtype");
module.exports = {
  addMenu: async (req, res) => {
    const {
      foodName,
      type,
      image,
      foodType,
      description,
      detail,
      price,
      status,
    } = req.body;
    try {
      const food = await Foods.create({
        foodName: foodName,
        type: type,
        image: image,
        foodType: foodType,
        description: description,
        detail: detail,
        price: price,
        status: status,
      });
    } catch (error) {
      res.status(400).json({ message: error });
      //console.log(error);
    }
    res.status(200).json({ message: "menu successfully added " });
  },
  addMenuPicture: async (req, res) => {
    res.status(200).json({ path: `images/${req.file.filename}` });
  },
  getAllMenu: async (req, res) => {
    try {
      const menu = await Foods.find();
      var menuAvailable = [];
      var menuOutofStock = [];
      menu.map((e) => {
        if (e.status == "InStock") {
          menuAvailable.push(e);
        } else if (e.status == "OutofStock") {
          menuOutofStock.push(e);
        }
      });
      var sortedMenu = [];
      menuAvailable.map((e) => {
        sortedMenu.push(e);
      });
      menuOutofStock.map((e) => {
        sortedMenu.push(e);
      });

      res.status(200).json(sortedMenu);
    } catch (error) {
      console.log(error);
      res.status(200).json({ message: error });
    }
  },
  getAlacarteMenu: async (req, res) => {
    try {
      const menu = await Foods.find({
        $or: [{ foodType: "a-la-carte" }, { foodType: "buffet a-la-carte" }],
      });

      var menuAvailable = [];
      var menuOutofStock = [];
      menu.map((e) => {
        if (e.status == "InStock") {
          menuAvailable.push(e);
        } else if (e.status == "OutofStock") {
          menuOutofStock.push(e);
        }
      });
      var sortedMenu = [];
      menuAvailable.map((e) => {
        sortedMenu.push(e);
      });
      menuOutofStock.map((e) => {
        sortedMenu.push(e);
      });

      res.status(200).json(sortedMenu);
    } catch (error) {
      console.log(error);
      res.status(200).json({ message: error });
    }
  },
  getBuffetMenu: async (req, res) => {
    //try {
    const menu = await Foods.find({
      $or: [{ foodType: "buffet" }, { foodType: "buffet a-la-carte" }],
    });
    var menuAvailable = [];
    var menuOutofStock = [];
    menu.map((e) => {
      if (e.status == "InStock") {
        menuAvailable.push(e);
      } else if (e.status == "OutofStock") {
        menuOutofStock.push(e);
      }
    });
    var sortedMenu = [];
    menuAvailable.map((e) => {
      sortedMenu.push(e);
    });
    menuOutofStock.map((e) => {
      sortedMenu.push(e);
    });

    res.status(200).json(sortedMenu);
    // } catch (error) {
    //   console.log(error);
    //   res.status(200).json({ message: error });
    // }
  },
  getMenuByID: async (req, res) => {
    const id = req.params.id;

    try {
      const menu = await Foods.findOne({ _id: id });

      res.status(200).json({ menu });
    } catch (error) {
      return res.status(404).json({ message: "can't find this menu" });
    }
  },
  getFoodType: async (req, res) => {
    try {
      const allfoodtype = await Foodtypes.findById("625dc2c3120628138b272c1b");
      res.status(200).json(allfoodtype.type);
    } catch (error) {}
  },
  addFoodType: async (req, res) => {
    const { foodtype } = req.body;
    try {
      await Foodtypes.findByIdAndUpdate("625dc2c3120628138b272c1b", {
        $push: {
          type: foodtype,
        },
      });
      res.status(200).json({ message: "type added" });
    } catch (error) {}
  },
  editMenu: async (req, res) => {
    try {
      await Foods.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).send({ message: "edit compleate" });
    } catch (error) {}
  },
  deleteMenu: async (req, res) => {
    try {
      await Foods.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "delete compleate" });
    } catch (error) {}
  },
};
