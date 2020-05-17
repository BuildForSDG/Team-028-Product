module.exports = (app) => {
  const fundCategory = require("../controller/fundCategory.controller");

  app.post("/fund/category", fundCategory.create);
};
