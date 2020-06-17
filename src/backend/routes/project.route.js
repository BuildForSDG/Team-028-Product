module.exports = (app) => {
  const project = require("../controller/project.controller");

  // Add new projects
  app.post("/projects", project.create);

  // Retrieve all projects
  app.get("/projects/all", project.findAll);

   // Get all projects created by an SME for funds application.
   app.get("/project/investorAll", project.findAllSMEProject);

  // Get single project
  app.get("/project/:id", project.findOne);

  // Get active project
  app.get("/projects/active", project.active);

  // Get all projects created by an SME for funds application.
  app.get("/project/projectAll", project.findAllwithCategory);
};

