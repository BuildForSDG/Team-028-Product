module.exports = (app) => {
  const disbursedFund = require("../controller/fundDisbursment.controller");

  app.post("/disbursfund", disbursedFund.create);
};
