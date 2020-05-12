module.exports = (sequelize, DataTypes) => {
  const AcctActivation = sequelize.define("useractivations", {
    activationId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
    activationStatus: {
      type: DataTypes.BOOLEAN,
    },
    activationDate: {
      type: DataTypes.DATE,
    },
  });
  return AcctActivation;
};
