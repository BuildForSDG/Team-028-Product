module.exports = (sequelize, DataTypes) => {
  const Repayment = sequelize.define(
    "repayment",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      repaymentId: {
        type: DataTypes.STRING
        //allowNull: false
      },
      companyName: {
        type: DataTypes.STRING
      },
      applicationId: {
        type: DataTypes.STRING
      },
      amountPaid: {
        type: DataTypes.INTEGER
      },
      bank: {
        type: DataTypes.STRING
      },
      accountNumber: {
        type: DataTypes.INTEGER
      },
      repaymentDAte: {
        type: DataTypes.DATE
      },
      confirmedBy: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );
  return Repayment;
};
