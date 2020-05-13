module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    userId: {
      type: Sequelize.INTEGER,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
