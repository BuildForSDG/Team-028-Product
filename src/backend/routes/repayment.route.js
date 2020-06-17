/* eslint-disable global-require */
module.exports = (app) => {
  const refund = require("../controller/repayment.controller");

  // Create a new
  app.post("/refund", refund.create);

  // Retrieve all Users
  app.get("/refund/all", refund.findAll);

  // find  by id
  app.get("/refund/company", refund.findOne);
};
