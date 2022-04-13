const Foods = require("../../model/food");

module.exports = {
  addMenu: async (req, res) => {
    const { foodName, type, image, foodType, description, detail } = req.body;
    try {
      const food = await Foods.create({
        foodName: foodName,
        type: type,
        image: image,
        foodType: foodType,
        description: description,
        detail: detail,
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
      res.status(200).json(menu);
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
      res.status(200).json(menu);
    } catch (error) {
      console.log(error);
      res.status(200).json({ message: error });
    }
  },
  getBuffetMenu: async (req, res) => {
    try {
      const menu = await Foods.find({
        $or: [{ foodType: "buffet" }, { foodType: "buffet a-la-carte" }],
      });
      res.status(200).json(menu);
    } catch (error) {
      console.log(error);
      res.status(200).json({ message: error });
    }
  },
  getMenuByID: async (req, res) => {
    const { id } = req.body;

    try {
      const menu = await Foods.findOne({ _id: id });

      res.status(200).json({ menu });
    } catch (error) {
      return res.status(404).json({ message: "can't find this menu" });
    }
  },
};
