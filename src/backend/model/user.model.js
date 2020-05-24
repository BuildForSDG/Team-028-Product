module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      userId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
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
      isVerified: {
        type: Sequelize.BOOLEAN,
        default: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return User;
};
