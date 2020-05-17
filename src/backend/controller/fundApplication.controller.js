const db = require("../config/db.config");
const FundApplication = db.fundApplication;

// Post a application
exports.create = (req, res) => {
  let date = new Date();
  if (!req.body) {
    return res.status(400).send({
      message: "Fields cannot be empty"
    });
  }

  // create new user instance
  const fundApplication = new FundApplication({
    applicationId: req.body.applicationId,
    userId: req.body.userId,
    fundId: req.body.fundId,
    fundCatId: req.body.fundCatId,
    status: req.body.status,
    applicationDate: date
  });
  fundApplication
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
