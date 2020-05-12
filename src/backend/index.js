const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/db.config");

//sync db
db.sequelize.sync().then(() => {
  console.log("Connection Successfully Established");
});

require("./routes/user.route")(app);
require("./routes/userCat.route")(app);
require("./routes/userOganization.route")(app);
require("./routes/previlege.route")(app);

app.listen(PORT, () => {
  console.log("App listening at port", PORT);
});
