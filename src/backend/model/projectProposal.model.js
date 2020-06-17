module.exports = (sequelize, DataTypes) => {
  const Proposal = sequelize.define(
    "projectproposal",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey: true
      },
      proposalId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {         
         model: "organizations",
         key: "organizationId"
       }
      },
      userId: {
        type: DataTypes.STRING
      },
      applicationId: {
        type: DataTypes.STRING
      },
      projectId: {
        type: DataTypes.STRING
      },
      filePath: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );
  Proposal.associate = function(models) {
    Proposal.belongsTo(models.organization, {foreignKey: "organizationId", as: "company"});
  };

  return Proposal;
};
