const Sequelize = require("sequelize");
const env = require("./env.js");

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: 0,

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
db.organizations = require("../model/organization.model")(
  sequelize,
  Sequelize
);
db.privileges = require("../model/privileges.model")(sequelize, Sequelize);
db.userLogin = require("../model/userLoggin.model")(sequelize, Sequelize);
db.roles = require("../model/role.model")(sequelize, Sequelize);
db.roleprivileges = require("../model/roleprivileges.model")(sequelize, Sequelize);
db.audits = require("../model/audit.model")(sequelize, Sequelize);


db.users.belongsTo(db.organizations, { foreignKey: "organizationId", as: "organizations" });
db.organizations.hasMany(db.users, { as: "users" });

db.roles.belongsToMany(db.privileges, { through: "roleprivileges", foreignKey: "roleId", as: "privileges" });
db.roleprivileges.belongsTo(db.roles, { foreignKey: "roleId" });
db.roleprivileges.belongsTo(db.privileges, { foreignKey: "privilegeId" });
db.roles.belongsToMany(db.roles, { through: "roleprivileges", foreignKey: "privilegeId", as: "roles" });

module.exports = db;
