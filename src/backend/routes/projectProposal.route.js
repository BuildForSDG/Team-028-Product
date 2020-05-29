module.exports = (app) => {
  const proposal = require("../controller/projectProposal.controller");

  app.post("/proposals", proposal.create);

  app.get("/proposals/all", proposal.findAll);
};
