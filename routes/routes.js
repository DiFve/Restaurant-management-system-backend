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
  app.post(
    "/api/registerEmployee",
    controller.loginController.registerEmployee
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
  app.put("/api/editMenu/:id", controller.menuController.editMenu);
  app.delete("/api/deleteMenu/:id", controller.menuController.deleteMenu);
  //table
  app.post("/api/makeTable", controller.tableController.makeTable);
  app.get("/api/seeTable", controller.tableController.seeTable);
  app.get("/api/seeTableByID/:id", controller.tableController.seeTableByID);

  app.put("/api/addBuffetPrice/:id", controller.tableController.addBuffetPrice);
  app.put("/api/pushEmployeeCall", controller.tableController.pushCallEmployee);
  app.put(
    "/api/cancelEmployeeCall",
    controller.tableController.cancelCallEmployee
  );

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

  //orderlist
  app.get(
    "/api/seeOrderTable/:tableNumber",
    controller.orderListController.seeOrderTable
  );
  app.get("/api/comingOrder", controller.orderListController.inComingOrder);
  app.put(
    "/api/updateFoodStatus",
    controller.orderListController.updateFoodStatus
  );
  app.put(
    "/api/seeItembyOrderId",
    controller.orderListController.seeItembyOrderId
  );

  //user
  app.get(
    "/api/getAllEmployeeData",
    controller.adminController.getAllEmployeeData
  );
};
