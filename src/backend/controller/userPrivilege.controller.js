const db = require('../config/db.config');

const Previlege = db.userPrevilege;

// Post a User
// eslint-disable-next-line consistent-return
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Previleges not assigened'
    });
  }

  const previlege = new Previlege({
    userId: req.body.useruserIdCatId,
    previlegeName: req.body.previlegeName,
    description: req.body.description,
    createdBy: req.body.createdBy
  });
  previlege
    .save()
    .then(() => {
      res.status(200).send('User previleges assigned');
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Previleges not assigned'
      });
    });
};
