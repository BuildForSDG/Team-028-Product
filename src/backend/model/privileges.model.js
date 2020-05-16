module.exports = (sequelize, DataTypes) => {
  const Privilege = sequelize.define('privileges', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING
    },
    privilegeName: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    dateCreated: {
      type: DataTypes.DATE
    },
    createdBy: {
      type: DataTypes.STRING
    }
  });
  return Privilege;
};
