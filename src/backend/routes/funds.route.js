module.exports = (app) => {
  const fund = require("../controller/funds.controller");

  app.post("/funding", fund.create);
};
