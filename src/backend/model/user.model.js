module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("usercategory", {
    userCtaId: {
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    categoryName: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.DATE,
    },
    createdBy: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
