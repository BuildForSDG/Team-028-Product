const db = require("../config/db.config");
const FundCategory = db.fundCategory;

/* The system admin will create differend categories of funds for 
    projects in the same category to be funded
*/
exports.create = (req, res) => {
  let requests = {
    fundCatId: req.body.fundCatId,
    categoryName: req.body.categoryName,
    description: req.body.description,
    createdBy: req.body.createdBy
  };
  if (!req.body) {
    return res.status(400).send({
      message: "Fields cannot be empty"
    });
  }

  FundCategory.findOne({ where: { fundCatId: req.body.fundCatId } }).then((data) => {
    if (data) {
      res.status(400).send({
        message: "Fund category lready exist"
      });
    } else {
      // create fund category instance
      const fundCategory = new FundCategory(requests);
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
    }
  });
};

//Get categories
exports.findAll = (req, res) => {
  FundCategory.findAll()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving Fund Category."
      });
    });
};

// Find funds by name category
exports.findOne = (req, res) => {
  FundCategory.findAll({ where: { categoryName: req.body.categoryName } })
    .then((data) => {
      if (!data) {
        res.status(400).send({
          message: " Category not found"
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Fund categorie."
      });
    });
};
