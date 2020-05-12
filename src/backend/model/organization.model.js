module.exports = (sequelize, DataTypes) => {
  const UserOrgnization = sequelize.define("organizations", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    organizationId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    userCatId: {
      type: DataTypes.INTEGER,
    },
    companyName: {
      type: DataTypes.STRING,
    },
    RCNumber: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    BVN: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
    },
    dateIncorporated: {
      type: DataTypes.DATE,
    },
  });
  return UserOrgnization;
};
