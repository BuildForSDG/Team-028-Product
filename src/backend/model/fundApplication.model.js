module.exports = (sequelize, DataTypes) => {
  const FundApplication = sequelize.define("fundapplications", {
    applicationId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    fundId: {
      type: DataTypes.INTEGER,
    },
    fundCatId: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
    applicationDate: {
      type: DataTypes.DATE,
    },
  });
  return FundApplication;
};
