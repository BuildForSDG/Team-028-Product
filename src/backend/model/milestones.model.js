module.exports = (sequelize, DataTypes) => {
  const Milestone = sequelize.define("milestone", {
    milestoneId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    applicationId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    dateStart: {
      type: DataTypes.DATE,
    },
    dateEnd: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
    confirmedBy: {
      type: DataTypes.INTEGER,
    },
    dateConfirmed: {
      type: DataTypes.DATE,
    },
  });
  return Milestone;
};
