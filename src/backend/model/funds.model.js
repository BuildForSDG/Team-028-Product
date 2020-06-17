module.exports = (sequelize, DataTypes) => {
  const Fund = sequelize.define(
    "funds",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      fundId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      organizationId: {
        type: DataTypes.STRING
      },
      fundCatId: {
        type: DataTypes.STRING
      },
      projectId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      amount: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      },
      dateInitiated: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );
  return Fund;
};
