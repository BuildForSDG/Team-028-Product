/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
const db = require("../config/db.config");

const Organization = db.userOrganization;

// Post User organization
exports.create = (req, res) => {
  let id = Math.floor(Math.random() * 10000) + 1;
  const request = {
    organizationId: id,
    companyName: req.body.companyName,
    category: req.body.category,
    RCNumber: req.body.RCNumber,
    email: req.body.email,
    BVN: req.body.BVN,
    address: req.body.address,
    dateIncorporated: req.body.dateIncorporated
  };

  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "User organization details cannot be empty"
    });
  }
  // Check if organization is registerre
  Organization.findOne({
    where: { organizationId: request.organizationId }
  }).then((data) => {
    if (data) {
      // return organization's details found
      return res.status(401).json({
        status: "error",
        message: "Organisation already registered"
      });
    } else {
      //save organization
      const userOrganization = new Organization(request);
      userOrganization
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
            message: err.message || "Unable to save organization details."
          });
        });
    }
  });
};

// Retrieve all organizations
exports.findAll = (req, res) => {
  Organization.findAll()
    .then((organizations) => {
      return res.status(200).json({
        status: "success",
        data: organizations
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: err.message
      });
    });
};

// Find organization by id
exports.findOne = (req, res) => {
  Organization.findOne({ where: { organizationId: req.body.organizationId } })
    .then((data) => {
      if (!data) {
        return res.status(401).json({
          status: "error",
          message: " organization not found"
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
        message: err.message
      });
    });
};

// Find organization by Category
exports.findAll = (req, res) => {
  Organization.findAll({ where: { userCatId: req.body.userCatId } })
    .then((data) => {
      if (!data) {
        return res.status(401).json({
          status: "error",
          message: " organization not found"
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
        message: err.message
      });
    });
};