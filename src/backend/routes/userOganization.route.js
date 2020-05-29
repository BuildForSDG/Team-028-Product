module.exports = (app) => {
  const organization = require("../controller/userOrganisation.controller");

  //post to organization table organization
  app.post("/organizations", organization.create);

  //Retrieve all organisations  
  app.get("/organizations/all", organization.findAll);

  //Return single organization by organization's id
  app.get("/organization/:id", organization.findOne);

  //Return single organization by organization's category
  app.get("/organizations/list", organization.findAll);
};
