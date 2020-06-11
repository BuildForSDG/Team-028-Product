module.exports = (app) => {
  const eligibility = require("../controller/eligibility.controller");

  app.post("/eligibility", eligibility.create);

  app.get("/eligibility/find", eligibility.findOne);
};
