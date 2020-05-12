module.exports = (sequelize, DataTypes) => {
  const FundApplication = sequelize.define("fundapplications", {
    projectId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    projectCatId: {
      type: DataTypes.INTEGER,
    },
    projectName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    createdBy: {
      type: DataTypes.STRING,
    },
    dateCtreated: {
      type: DataTypes.DATE,
    },
    dateStart: {
      type: DataTypes.DATE,
    },
    dateEnd: {
      type: DataTypes.DATE,
    },
  });
  return FundApplication;
};
