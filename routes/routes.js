//const adminController = require("../controller/admin/admin.controller");
const controller = require("../controller/admin");
const auth = require("../middleware/auth");

module.exports = (app) => {
  app.post("/api/register", (req, res) =>
    controller.adminloginController.register(req, res)
  );
  app.post("/api/login", (req, res) =>
    controller.adminloginController.login(req, res)
  );
  app.post("/api/home", auth, (req, res) =>
    controller.adminloginController.home(req, res)
  );
};
