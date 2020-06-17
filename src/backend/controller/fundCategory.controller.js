const db = require("../config/db.config");
const FundCategory = db.fundCategory;

/* The system admin will create differend categories of funds for 
    projects in the same category to be funded
*/
exports.create = (req, res) => {
  const id = Math.floor(Math.random() * 10000) + 1;
  let requests = {
    fundCatId: id,
    categoryName: req.body.categoryName,
    description: req.body.description,
    createdBy: req.body.createdBy
  };
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Fields cannot be empty"
    });
  }
 
      // create fund category instance
      const fundCategory = new FundCategory(requests);
      fundCategory
        .save()
        .then((data) => {
          return res.status(200).json({
            status: "success",
            data
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: "error",
            message: err.message || "Something went wrong."
          });
        });

};

//Get categories
exports.findAll = (req, res) => {
  FundCategory.findAll()
    .then((result) => {
      return res.status(200).json({
        status: "error",
        data: result
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: err.message || "Something wrong while retrieving Fund Category."
      });
    });
};

// Find funds by name category
exports.findOne = (req, res) => {
  FundCategory.findAll({ where: { categoryName: req.body.categoryName } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          status: "error",
          message: " Category not found"
        });
      } else {
        return res.status(200).json({
          status: "success",
          data
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: err.message || "Some error occurred while retrieving Fund categorie."
      });
    });
};
