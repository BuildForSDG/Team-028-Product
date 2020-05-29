module.exports = (app) => {
  const states = require("../controller/states.controller");

  app.post("/states", states.create);

  app.get("/states/all", states.findAll);
};
