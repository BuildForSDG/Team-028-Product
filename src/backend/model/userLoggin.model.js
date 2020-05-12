module.exports = (sequelize, DataTypes) => {
  const LoginUser = sequelize.define("userlogin", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    detaCreated: {
      type: DataTypes.DATE,
    },
  });
  return LoginUser;
};
