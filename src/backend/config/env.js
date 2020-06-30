const env = {
  database: "eazsme_db",
  username: "root",
  password: "",
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  mail: {
    user: "eazsme@gmail.com",
    pass: "eazsmebdgs"
  }
};

module.exports = env;
