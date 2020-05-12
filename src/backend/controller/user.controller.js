const db = require("../config/db.config");
const User = db.users;

// Post a User
exports.create = (req, res) => {
  if (!req.body)
    return res.status(400).send({
      message: "User details cannot be empty",
    });
  // create new user instance
  const user = new User({
    userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
  });
  user
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Something wrong while creating the user profile.",
      });
    });
};

exports.findAll = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving users.",
      });
    });
};

//fine single user by id
exports.findOne = (req, res) => {
  User.findOne({ userId: req.body.userId })
    .then((user) => {
      if (!user)
        return res.status(404).send({
          message: "User Profile not found",
        });
      // if user found, send user details
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId")
        return res.status(404).send({
          message: "User Profile not found ",
        });

      return res.status(500).send({
        message: "Something went wrong retrieving User profile ",
      });
    });
};

// Update a User
exports.update = (req, res) => {
  const id = req.params.userId;
  User.update(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    },
    { where: { id: req.params.userId } }
  ).then(() => {
    res.status(200).send("updated successfully a user with id = " + id);
  });
};

// Delete a User by Id
exports.delete = (req, res) => {
  const id = req.params.userId;
  User.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a user with id = " + id);
  });
};
