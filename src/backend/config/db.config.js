const Sequelize = require("sequelize");
const env = require("./env.js");

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: 0,
  logging: true,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.users = require("../model/user.model.js")(sequelize, Sequelize);
db.userCategory = require("../model/usercategory.model")(sequelize, Sequelize);
db.userOrganization = require("../model/organization.model")(sequelize, Sequelize);
db.privilege = require("../model/privileges.model")(sequelize, Sequelize);
db.userLogin = require("../model/userLoggin.model")(sequelize, Sequelize);
db.fund = require("../model/funds.model")(sequelize, Sequelize);
db.fundCategory = require("../model/fundCategory.model")(sequelize, Sequelize);
db.fundApplication = require("../model/fundApplication.model")(sequelize, Sequelize);
db.fundDisbursment = require("../model/disbursment.model")(sequelize, Sequelize);
db.project = require("../model/project.model")(sequelize, Sequelize);
db.projectCategory = require("../model/projectCategory.model")(sequelize, Sequelize);
db.proposal = require("../model/projectProposal.model")(sequelize, Sequelize);
db.ngState = require("../model/states.model")(sequelize, Sequelize);
db.lga = require("../model/lga.model")(sequelize, Sequelize);
db.role = require("../model/role.model")(sequelize, Sequelize);
db.payment = require("../model/payment.model")(sequelize, Sequelize);

// Table relatioships
db.users.belongsTo(db.userOrganization);
db.userOrganization.hasMany(db.users);

module.exports = db;
