module.exports = (app) => {
  const milestone = require("../controller/milestone.controller");

  // Create milestones
  app.post("/milestones", milestone.create);

  // Retrieve all milestones
  app.get("/milestones/all", milestone.findAll);

  // Retrieve milestone by name
  app.get("/milestones/name", milestone.findOne);

  // Create milestones
  app.put("/milestones/id", milestone.updateMilestone);
};
