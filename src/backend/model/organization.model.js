module.exports = (sequelize, DataTypes) => {
  const UserOrgnization = sequelize.define(
    "organizations",
    {
      organizationId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      companyName: {
        type: DataTypes.STRING
      },
      category: {
        type: DataTypes.STRING
      },  
      RCNumber: {
        type: DataTypes.STRING  
      },
      email: {
        type: DataTypes.STRING
      },
      BVN: {
        type: DataTypes.INTEGER
      },
      address: {
        type: DataTypes.STRING
      },
      dateIncorporated: {
        type: DataTypes.DATE
      }
    },
    {
      timestamps: false
    }
  );
  return UserOrgnization;
};
