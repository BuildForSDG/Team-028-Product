module.exports = (sequelize, DataTypes) => {
  const Milestone = sequelize.define(
    "milestone",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      milestoneId: {
        type: DataTypes.STRING
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      applicationId: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      startDate: {
        type: DataTypes.STRING
      },
      endDate: {
        type: DataTypes.STRING
      },
      progress: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      },

      confirmedBy: {
        type: DataTypes.STRING
      },
      dateConfirmed: {
        type: DataTypes.DATE
      }
    },
    {
      timestamps: false   
    }
  );
  return Milestone;
};
