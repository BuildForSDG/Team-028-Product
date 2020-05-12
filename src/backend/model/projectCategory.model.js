module.exports = (sequelize, DataTypes) => {
  const ProjectCategory = sequelize.define("projectcategory", {
    projectCatId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    dateCreated: {
      type: DataTypes.DATE,
    },
    createdBy: {
      type: DataTypes.STRING,
    },
  });
  return ProjectCategory;
};
