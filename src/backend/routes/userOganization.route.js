module.exports = (app) => {
  const organization = require("../controller/userOrganisation.controller");

  //post to organization table organization
  app.post("/organizations", organization.create);
};
