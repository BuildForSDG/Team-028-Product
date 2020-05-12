const db = require("../config/db.config");
const UserCategory = db.userCategory;

// Post a User
exports.create = (req, res) => {
  if (!req.body)
    return res.status(400).send({
      message: "User details cannot be empty",
    });
  // create new user instance
  const userCategory = new UserCategory({
    userCatId: req.body.userCatId,
    userId: req.body.userId,
    categoryName: req.body.categoryName,
    description: req.body.description,
    createdBy: req.body.createdBy,
  });
  userCategory
    .save()
    .then((data) => {
      res.status(200).send("User Category Saved");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Something wrong while creating the user category profile.",
      });
    });
};
