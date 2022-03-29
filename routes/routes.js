//const adminController = require("../controller/admin/admin.controller");
const controller = require("../controller/admin");
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.post("/api/register", controller.adminloginController.register);
  app.post("/api/login", controller.adminloginController.login);
  app.post("/api/home", auth, controller.adminloginController.home);
};
