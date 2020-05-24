module.exports = (sequelize, DataTypes) => {
  const UserCategory = sequelize.define(
    "usercategories",
    {
      userCatId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
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
    },
    {
      timestamps: false,
    }
  );
  return UserCategory;
};
