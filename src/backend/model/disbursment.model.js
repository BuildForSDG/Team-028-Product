module.exports = (sequelize, DataTypes) => {
  const Disbursement = sequelize.define("disbursements", {
    disbursementId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    applicationId: {
      type: DataTypes.INTEGER,
    },
    fundId: {
      type: DataTypes.INTEGER,
    },
    disbursedTo: {
      type: DataTypes.INTEGER,
    },
    disbursedBy: {
      type: DataTypes.INTEGER,
    },
    bank: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
  });
  return Disbursement;
};
