const userCategory = require("../controller/userCat.controller");

module.exports = (app) => {
  // Create a new User Category
  app.post("/category", userCategory.create);
};
