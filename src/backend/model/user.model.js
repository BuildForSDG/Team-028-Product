module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("usercategory", {
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
