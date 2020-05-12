module.exports = (sequelize, DataTypes) => {
  const UserCategory = sequelize.define("usercategories", {
    userCatId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
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
  return UserCategory;
};
