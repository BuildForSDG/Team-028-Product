module.exports = (sequelize, DataTypes) => {
  const Disbursement = sequelize.define(
    "disbursements",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement : true,
        primaryKey: true
      },
      disbursementId: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      organization: {
        type: DataTypes.STRING
      },
      applicationId: {
        type: DataTypes.STRING
      },
      fundId: {
        type: DataTypes.STRING
      },
      projectId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      disbursedTo: {
        type: DataTypes.STRING
      },
      disbursedBy: {
        type: DataTypes.STRING
      },
      bankName: {
        type: DataTypes.STRING
      },
      accountNunber: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );
  return Disbursement;
};
