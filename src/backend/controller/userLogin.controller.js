const db = require("../config/db.config");

const Login = db.userLogin;

// Post a User
// eslint-disable-next-line consistent-return
exports.create = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "User login credentials cannot be empty"
    });
  }
  // create new user instance
  const user = new Login({
    userId: req.body.userId,
    username: req.body.username,
    password: req.body.password
  });
  user
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the user profile."
      });
    });
};
