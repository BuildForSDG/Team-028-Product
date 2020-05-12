const env = require("./env.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: 0,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require("../model/user.model.js")(sequelize, Sequelize);
db.userCategory = require("../model/usercategory.model")(sequelize, Sequelize);
db.userOrganization = require("../model/organization.model")(
  sequelize,
  Sequelize
);
db.userPrevilege = require("../model/previleges.model")(sequelize, Sequelize);

module.exports = db;
