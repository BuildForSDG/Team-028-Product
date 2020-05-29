module.exports = (app) => {
  const fundApplication = require("../controller/fundApplication.controller");

  app.post("/fund/apply", fundApplication.create);

  app.get("/fund/applications/all", fundApplication.findAll);

  app.get("/fund/application/:id", fundApplication.findOne);
};
