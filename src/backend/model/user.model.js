module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      userId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        required: true
      },
      otherName:{
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      organizationId: {
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      lga: {
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
