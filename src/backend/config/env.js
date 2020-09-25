const env = {
  database: "eazsme_db",
  username: "root",
  password: "password",
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
    pass: "eazsmebdgs",
    apiKey: "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"
  }
};

module.exports = env;
