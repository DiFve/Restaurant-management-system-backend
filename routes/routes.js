//const adminController = require("../controller/admin/admin.controller");
const controller = require("../controller/admin");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

module.exports = (app) => {
  //auth
  app.post("/api/register", controller.loginController.register);
  app.post("/api/login", controller.loginController.login);
  app.post("/api/auth", auth, controller.loginController.home);
  app.post(
    "/api/makeTableForCustomer",
    auth,
    controller.adminController.makeTableForCustomer
  );

  //menu
  app.post("/api/addMenu", controller.menuController.addMenu);
  app.post(
    "/api/addMenuPicture",
    upload.single("image"),
    controller.menuController.addMenuPicture
  );
  app.get("/api/getAllMenu", controller.menuController.getAllMenu);
  app.get("/api/getAlacarteMenu", controller.menuController.getAlacarteMenu);
  app.get("/api/getBuffetMenu", controller.menuController.getBuffetMenu);
  app.get("/api/getMenuByID/:id", controller.menuController.getMenuByID);
  app.put("/api/addFoodType", controller.menuController.addFoodType);
  app.get("/api/getFoodType", controller.menuController.getFoodType);

  //table
  app.post("/api/makeTable", controller.tableController.makeTable);
  app.get("/api/seeTable", controller.tableController.seeTable);
  app.put("/api/addOrderlist/:id", controller.tableController.addOrderlist);
  app.get("/api/seeTableByID", controller.tableController.seeTableByID);
};
