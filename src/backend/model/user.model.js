module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      userId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      organizationId: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      otherName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        required: true
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      privilege: {
        type: Sequelize.STRING
      },
      dateCreated: {
        type: Sequelize.DATE
      }
    },
    {
      timestamps: false
    }
  );

  return User;
};
