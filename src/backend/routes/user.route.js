/* eslint-disable global-require */
module.exports = (app) => {
  const users = require("../controller/user.controller.js");

  // Create a new User
  app.post("/register", users.create);

  // Activate user
  app.get("/user/verify", users.activate);

  // Retrieve all Users
  app.get("/users", users.findAll);

  // find user by id
  app.get("/users/:id", users.findOne);

// Create a new organization's user
app.post("/organizationUser", users.userOrganization);

 // find user by organization id
 app.get("/users/:orgId", users.findOnebyOrganization);

// update an organization's user
app.put("/updateOrguser", users.updateOne);

  
};
