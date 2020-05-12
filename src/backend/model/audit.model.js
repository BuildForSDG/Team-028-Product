module.exports = (sequelize, DataTypes) => {
  const Audit = sequelize.define("audit", {
    auditId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    action: {
      type: DataTypes.STRING,
    },
    actionStatus: {
      type: DataTypes.STRING,
    },
    performedBy: {
      type: DataTypes.INTEGER,
    },
    actionTime: {
      type: DataTypes.TIME,
    },
  });
  return Audit;
};
