module.exports = (app) => {
  const login = require("../controller/userLogin.controller");

  app.post("/login", login.findOne);
};
