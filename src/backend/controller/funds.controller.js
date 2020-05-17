const db = require("../config/db.config");
const Fund = db.fund;

// Post a User
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Fund cannot be empty"
    });
  }

  // create new user instance
  const fund = new Fund({
    fundId: req.body.fundId,
    organizationId: req.body.organizationId,
    fundCatId: req.body.fundCatId,
    fundName: req.body.fundName,
    dateInitiated: req.body.dateInitiated
  });
  fund
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something went wrong."
      });
    });
};
