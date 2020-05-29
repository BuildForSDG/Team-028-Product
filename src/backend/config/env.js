const env = {
  database: "eazsme_db",
  username: "team028",
  password: "password",
  host: "db4free.net",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = env;
