module.exports = (app) => {
  const previlege = require("../controller/userPrevilege.controller");

  app.post("/previleges", previlege.create);
};
