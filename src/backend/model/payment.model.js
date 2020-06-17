module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "payments",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      organizationId: {
        type: DataTypes.STRING
      },
      fundId: {
        type: DataTypes.STRING
      },
      accountNumber: {
        type: DataTypes.INTEGER
      },
      bankName: {
        type: DataTypes.STRING
      },
      tellerNo: {
        type: DataTypes.STRING
      },
      amount: {
        type: DataTypes.DOUBLE
      },
      status: {
        type: DataTypes.STRING
      },
      paidBy: {
        type: DataTypes.STRING
      },
      paymentDate: {
        type: DataTypes.DATE
      }
    },
    {
      timestamps: false
    }
  );
  return Payment;
};
