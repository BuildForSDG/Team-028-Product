const privilege = require("../controller/userPrivilege.controller");

module.exports = (app) => {
  app.post("/privileges", privilege.create);
};
