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
      projectCatId:{
        type: DataTypes.STRING
      },
      categoryName: {
        type: DataTypes.STRING
      },
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
        type: DataTypes.STRING
      },
      dateEnd: {
        type: DataTypes.STRING
      },
      fund: {
        type: DataTypes.STRING
      },
      Status: {
        type: DataTypes.STRING
      },
      dateCreated: {
        type: DataTypes.DATE
      }
    },
    {
      timestamps: false
    }
  );

 /* Project.associate = function(models) {
    Project.belongsTo(models.projectCategory, {foreignKey: 'id', as: 'category'})
  };*/

  return Project;
};
