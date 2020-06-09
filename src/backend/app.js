/* eslint-disable no-unused-expressions */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/db.config");  

// Set CORS for all headers
const whitelist = ["http://localhost:3000", "https://eazsme-frontend.herokuapp.com"];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));

//sync db
db.sequelize.sync({ force: false }).then(() => {});


require("./routes/user.route")(app);
require("./routes/userCat.route")(app);
require("./routes/userLogin.route")(app);
require("./routes/userOganization.route")(app);
require("./routes/privilege.route")(app);
require("./routes/funds.route")(app);
require("./routes/fundCategory.route")(app);
require("./routes/fundApplication.route")(app);
require("./routes/fundDisbursment.route")(app);
require("./routes/project.route")(app);
require("./routes/projectCategory.route")(app);
require("./routes/projectProposal.route")(app);
require("./routes/states.route")(app);
require("./routes/lga.route")(app);
require("./routes/role.route")(app);
require("./routes/milestone.route")(app);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    PORT;
  });
}

module.exports = { app };
