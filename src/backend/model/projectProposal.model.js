module.exports = (sequelize, DataTypes) => {
  const Proposal = sequelize.define("projectproposals", {
    proposalId: {
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
    projectId: {
      type: DataTypes.INTEGER,
    },
    filePath: {
      type: DataTypes.STRING,
    },
  });
  return Proposal;
};
