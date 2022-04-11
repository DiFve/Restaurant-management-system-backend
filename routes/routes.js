//const adminController = require("../controller/admin/admin.controller");
const controller = require("../controller/admin");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

module.exports = (app) => {
  //auth
  app.post("/api/register", controller.adminloginController.register);
  app.post("/api/login", controller.adminloginController.login);
  app.post("/api/auth", auth, controller.adminloginController.home);

  app.post("/api/addMenu", controller.menuController.addMenu);
  app.post(
    "/api/addMenuPicture",
    upload.single("image"),
    controller.menuController.addMenuPicture
  );
  app.get("/api/getAllMenu", controller.menuController.getAllMenu);
  app.get("/api/getAlacarteMenu", controller.menuController.getAlacarteMenu);
  app.get("/api/getBuffetMenu", controller.menuController.getBuffetMenu);
};
