const env = {
  database: "eazsme_db",
  username: "root",
  password: "Pass123%",
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = env;
