const organization = require('../controller/userOrganisation.controller');

module.exports = (app) => {
  // post to organization table organization
  app.post('/organizations', organization.create);
};
