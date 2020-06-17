module.exports = (sequelize, DataTypes) => {
  const ProjectCategory = sequelize.define(
    "projectcategory",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      projectCatId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      categoryName: {
        type: DataTypes.STRING
      },
      categoryDescription: {
        type: DataTypes.STRING
      },
      createdBy: {
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false
    }
  );

 /* ProjectCategory.associate = function(models) {
    ProjectCategory.hasMany(models.project, {as: 'project'}, {foreignKey: 'id'})
  }*/

  return ProjectCategory;
};
