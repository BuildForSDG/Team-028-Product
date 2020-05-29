module.exports = (app) => {
  const project = require("../controller/project.controller");

  // Add new projects
  app.post("/projects", project.create);

  // Retrieve all projects
  app.get("/projects/all", project.findAll);

  // Get single project
  app.get("/project/:id", project.findOne);
};
