module.exports = (app) => {
  const fundApplication = require("../controller/fundApplication.controller");

  app.post("/fund/apply", fundApplication.create);
};
