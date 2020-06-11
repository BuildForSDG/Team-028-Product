module.exports = (sequelize, DataTypes) => {
  const Eligibility = sequelize.define(
    "eligibilty",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      projectId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      projectName: {
        type: DataTypes.STRING
      },
      eligibilityCreteria: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );
  return Eligibility;
};
