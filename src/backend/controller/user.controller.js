const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = "serete";
const db = require("../config/db.config");
const User = db.users;
const Userpass = db.userLogin;

// Post User
exports.create = (req, res) => {
  //let today = new Date();
  let userData = {
    userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber
  };
  let userPass = {
    userId: req.body.userId,
    userCatId: req.body.userCatId,
    username: req.body.username,
    password: req.body.password
  };
  //Check empty request
  if (!req.body) {
    return res.status(204).send({
      message: "User details cannot be empty"
    });
  } else {
    //Query user table to check if details already exist
    User.findOne({ where: { userId: userData.userId } }).then((resut) => {
      if (resut) {
        return res.status(401).send({
          message: "User already exist"
        });
      } else {
        //Query userlogin table to check if user login credentials already exist
        Userpass.findOne({ where: { userId: userPass.userId } }).then((data) => {
          if (data) {
            return res.status(401).send({
              message: "User already exist"
            });
          } else {
            // save user
            const user = new User(userData);
            user
              .save()
              .then((data) => {
                // save login credentials if user details is succesfully saved
                if (data) {
                  const pass = new Userpass(userPass);
                  // Encode password
                  bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(pass.password, salt, (err, hash) => {
                      if (err) {
                        return res.status(400).send({
                          message: err.message
                        });
                      } else {
                        pass.password = hash;
                        pass.saltSecret = salt;
                        pass
                          .save()
                          .then((data) => {
                            //Generate token
                            let payload = { subject: data };
                            let token = jwt.sign(payload, secret);
                            res.status(200).send({ token });
                          })
                          .catch((err) => {
                            res.status(500).send({
                              message: err.message
                            });
                          });
                      }
                    });
                  });
                } else {
                  res.status(400).send({
                    message: "Not saved"
                  });
                }
              })
              .catch((err) => {
                res.status(500).send({
                  message: err.message || "Something wrong while creating the user profile."
                });
              });
          }
        });
      }
    });
  }
};

exports.findAll = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message
      });
    });
};

//fine single user by id
exports.findOne = (req, res) => {
  User.findOne({ where: { userId: req.body.userId } })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User Profile not found "
        });
      }
      return res.status(500).send({
        message: err.message
      });
    });
};
