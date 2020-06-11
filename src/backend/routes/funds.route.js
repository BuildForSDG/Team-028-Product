module.exports = (app) => {
  const fund = require("../controller/funds.controller");

  // Invest funds
  app.post("/invest", fund.create);

  // Retrieve all funds
  app.get("/funds/all", fund.findAll);

  // Retrieve all funds with given status
  app.get("/funds/status", fund.findOne);

  // Retrieve all funds donated by investor
  app.get("/funds/:id", fund.findInvestmentsByOrganization);

app.put("/funds/update",fund.updateStatus);

};
