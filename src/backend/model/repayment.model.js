module.exports = (sequelize, DataTypes) => {
  const Repayment = sequelize.define("repayment", {
    repaymentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    applicationId: {
      type: DataTypes.INTEGER,
    },
    repaymentDAte: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
  });
  return Repayment;
};
