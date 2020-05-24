module.exports = (app) => {
  const users = require("../controller/user.controller.js");

  // Create a new User
  app.post("/user", users.create);

  // Retrieve all Users
  app.get("/users", users.findAll);

  //find user by id
  app.get("/users/:id", users.findOne);
};
