/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

process.env.SECRET_KEY = "secret";

// Require database
const db = require("../config/db.config");

const UserLogin = db.userLogin;
const Organization = db.userOrganization;
const AccActivation = db.useractivation;

exports.findOne = (req, res) => {
  // let request = {
  //   email: req.body.email,
  //   password: req.body.password
  // };
  UserLogin.findOne({ where: { email: req.body.email } })
    .then((data) => {
      // Check if login credentials exist
      if (!data) {
        const result = {
          message: " Invalid username or password"
        };
        return res.status(401).json({
          status: "error",
          data: result
        });
      }
      // verify if user is activated.
      AccActivation.findOne({ where: { email: req.body.email } })
        .then((activation) => {
          if(!activation) {
            return res.status(400).json({
              status: "error",
              message: "user is not activated"
            });
          }

          if (activation.dataValues.activationStatus !== "activated" ){
            return res.status(400).json({
              status: "error",
              message: "user is not activated"
            });
          }

          bcrypt
          .compare(req.body.password, data.dataValues.password)
          .then((val) => {
            if (!val) {
              const result = {
                message: " Invalid username or password"
              };
              return res.status(404).json({
                status: "error",
                data: result
              });
            } else {
              if (data.dataValues.email === req.body.email) {
                const result = {
                  category: data.category,
                  email: data.email,
                  organization: data.Organization,
                  companyName: data.companyName,
                  organizationId: data.organizationId,
                  privilege:  data.privilege,
                  userId: data.userId
                };
                return res.status(200).json({
                  status: "success",
                  data: result
                });
              }
            }
          })
          .catch((error) => {
            return res.status(400).json({
              status: "error",
              message: error.message || "password does not match"
            });
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: err.message || "Something went wrong"
      });
    });
};
