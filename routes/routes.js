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
  app.get("/api/seeTableByID/:id", controller.tableController.seeTableByID);
  //app.get("/api/deleteTable/:id", controller.tableController.deleteTable);

  //order
  //app.put("/api/addOrderlist/:id", controller.tableController.addOrderlist);
  app.get("/api/seeOrderTable/:id", controller.tableController.seeOrderTable);
  app.get("/api/comingOrder", controller.tableController.inComingOrder);
  // app.get("/api/cashTable/:id", controller.tableController.cashTable);

  //cart
  app.put(
    "/api/addItemToCart/:tableNumber",
    controller.cartController.addItemToCart
  );
  app.get(
    "/api/getAllItemInCart/:tableNumber",
    controller.cartController.getAllItemInCart
  );
  app.delete(
    "/api/deleteItemInCart/:tableNumber",
    controller.cartController.deleteItemInCart
  );
  app.put(
    "/api/confirmItemInCart/:tableNumber",
    controller.cartController.confirmItemInCart
  );
};
