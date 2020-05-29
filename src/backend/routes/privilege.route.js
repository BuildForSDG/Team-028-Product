module.exports = (app) => {
  const privilege = require("../controller/privilege.controller");

  app.post("/privileges", privilege.create);

  app.get("/privileges/all", privilege.findAll);
};
