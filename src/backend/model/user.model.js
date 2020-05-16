module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define("users", {
    userId: {
      type: Datatypes.INTEGER
    },
    firstName: {
      type: Datatypes.STRING
    },
    lastName: {
      type: Datatypes.STRING
    },
    userPassword: {
      type: Datatypes.TEXT
    },
    userEmail: {
      type: Datatypes.STRING
    },
    userCategory: {
      type: Datatypes.INTEGER
    },
    userOrganization: {
      type: Datatypes.INTEGER
    },
    userRole: {
      type: Datatypes.INTEGER
    },
    userPhone: {
      type: Datatypes.BIGINT
    },
    isVerified: {
      type: Datatypes.BOOLEAN
    }
  });

  return User;
};
