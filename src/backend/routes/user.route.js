const users = require("../controller/user.controller.js");

module.exports = (app) => {
  // Create a new User
  app.post("/user", users.register);

  // Retrieve all Users
  app.get("/users", users.findAll);
};
