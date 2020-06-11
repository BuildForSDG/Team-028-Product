module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "projects",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      projectId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      projectCatId: {
        type: DataTypes.STRING
      },
      // organizationId: {
      //   type: DataTypes.STRING,
      //   allowNull: true
      // },
      projectName: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      createdBy: {
        type: DataTypes.STRING
      },
      dateStart: {
        type: DataTypes.DATE
      },
      dateEnd: {
        type: DataTypes.DATE
      },
      fund: {
        type: DataTypes.STRING
      },
      dateCreated: {
        type: DataTypes.DATE
      },
      // status: {
      //   type: DataTypes.STRING
      // }
    },
    {
      timestamps: false
    }
  );
  return Project;
};
