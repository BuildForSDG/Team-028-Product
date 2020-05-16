const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const app = express();

const appRoot = path.dirname(require.main.filename);

const logger = require("./config/logger");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/db.config");

// Set CORS for all headers
app.use(cors());

app.use(morgan("combined"));
// sync db
db.sequelize.sync({ force: true }).then(() => {});

require("./routes/user.route")(app);
require("./routes/userCat.route")(app);
require("./routes/userOganization.route")(app);
require("./routes/privilege.route")(app);

app.listen(PORT, () => {
  logger.info(`Backend Server runs on port ${PORT}`);
});

module.exports = appRoot;
