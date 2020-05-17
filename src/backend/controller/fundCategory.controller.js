const db = require("../config/db.config");
const FundCategory = db.fundCategory;

// Post a User
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Fields cannot be empty"
    });
  }

  // create fund category instance
  const fundCategory = new FundCategory({
    fundCatId: req.body.fundCatId,
    categoryName: req.body.categoryName,
    description: req.body.description,
    createdBy: req.body.createdBy
  });
  fundCategory
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
