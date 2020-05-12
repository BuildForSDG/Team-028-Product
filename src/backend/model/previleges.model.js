module.exports = (sequelize, DataTypes) => {
  const Previlege = sequelize.define("userprevileges", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
    },
    previlegeName: {
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
  return Previlege;
};
