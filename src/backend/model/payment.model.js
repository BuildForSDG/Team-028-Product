module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("payments", {
    paymentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    fundId: {
      type: DataTypes.INTEGER,
    },
    bankAccount: {
      type: DataTypes.INTEGER,
    },
    bankName: {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    status: {
      type: DataTypes.STRING,
    },
    confirmationDate: {
      type: DataTypes.DATE,
    },
    confirmBy: {
      type: DataTypes.INTEGER,
    },
  });
  return Payment;
};
