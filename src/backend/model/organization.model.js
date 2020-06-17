module.exports = (sequelize, DataTypes) => {
  const UserOrganization = sequelize.define("organizations", {
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      type: DataTypes.BIGINT
    },
    address: {
      type: DataTypes.STRING
    },
    dateIncorporated: {
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  });

/*  UserOrganization.associate = function(models) {
    UserOrganization.hasMany(models.projectProposal, {as: 'proposal'})
  }*/
  return UserOrganization;
};
