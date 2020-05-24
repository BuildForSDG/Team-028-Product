module.exports = (sequelize, DataTypes) => {
  const LoginUser = sequelize.define(
    "userlogin",
    {
      userId: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
      },
      userCatId: {
        type: DataTypes.STRING,
        required: true,
      },
      username: {
        type: DataTypes.STRING,
        required: true,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
  return LoginUser;
};
