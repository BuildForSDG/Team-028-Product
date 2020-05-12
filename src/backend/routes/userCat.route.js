module.exports = (app) => {
  const userCategory = require("../controller/userCat.controller");

  // Create a new User Category
  app.post("/category", userCategory.create);
};
