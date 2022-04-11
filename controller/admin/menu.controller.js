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
      console.log(error);
    }
    res.status(200).json({ message: "menu successfully added " });
  },
  addMenuPicture: async (req, res) => {
    res.status(200).json({ path: `images/${req.file.filename}` });
  },
};
