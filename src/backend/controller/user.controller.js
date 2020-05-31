const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = "serete";
const db = require("../config/db.config");
const User = db.users;
const Userpass = db.userLogin;
const Organization = db.userOrganization;

// Post User
exports.create = (req, res) => {
  let today = new Date();

  //Check empty request
  if (!req.body) {
    return res.status(204).send({
      message: "User details cannot be empty"
    });
  } else {
    //Query user table to check if details already exist
    User.findOne({ where: { userId: req.body.userId } }).then((data) => {
      if (data) {
        // return result if data already exist
        return res.status(401).send({
          message: "User already exist"
        });
      } else {
        Organization.findOne({ where: { email: req.body.email } }).then((data) => {
          if (data) {
            return res.status(401).send({
              message: "Organisation already registered"
            });
          } else {
            //Query userlogin table to check if user login credentials already exist
            Userpass.findOne({ where: { userId: req.body.userId } }).then((data) => {
              if (data) {
                // return data if user login creadentials exist
                return res.status(401).send({
                  message: "User already exist"
                });
                
              } else {   
                let orgId = Math.floor(Math.random() * 10000) + 1;
                let userRole = "Admin";
                let userPrivilege = "Level 1";
                // Create new instance of  user
                const user = new User({
                  userId: req.body.userId,
                  organizationId: orgId,
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email,
                  phoneNumber: req.body.phoneNumber,
                  role: userRole,
                  privilege: userPrivilege,
                  dateCreated: today
                });
                // save new user
                user
                  .save()
                  .then((data) => {
                    // save login credentials if user details is succesfully saved
                    if (data) {
                      const pass = new Userpass({
                        loginId: req.body.loginId,
                        userId: req.body.userId,
                        organizationId: orgId,
                        username: req.body.username,
                        password: req.body.password
                      });
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
                                return res.status(200).send({ token });
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
                      return res.status(400).send({
                        message: "Not saved"
                      });
                    }
                  })
                  .catch((err) => {
                    return res.status(500).send({
                      message: err.message || "Something wrong while creating the user profile."
                    });
                  });
              }
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
      return res.status(200).send(users);
    })
    .catch((err) => {
      return res.status(500).send({
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
