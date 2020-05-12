module.exports = (sequelize, DataTypes) => {
  const Fund = sequelize.define("funds", {
    fundId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    organizationId: {
      type: DataTypes.INTEGER,
    },
    fundCatId: {
      type: DataTypes.INTEGER,
    },
    fundName: {
      type: DataTypes.DATE,
    },
    dateInitiated: {
      type: DataTypes.DATE,
    },
  });
  return Fund;
};
