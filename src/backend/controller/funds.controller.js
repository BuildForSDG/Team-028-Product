const db = require("../config/db.config");
const Fund = db.fund;
/**
 * This API will keep track of all funds recieved from
 * investors
 */ 

// Invest funds
exports.create = (req, res) => {
  let id = Math.floor(Math.random() * 10000) + 1;
  let requests = {
    fundId: id,
    organizationId: req.body.organizationId,
    fundCatId: req.body.fundCatId,
    amount: req.body.amount,
    status: req.body.status,
    dateInitiated: req.body.dateInitiated
  };
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Please fill all funds input fields"
    });
  } else {
    Fund.findOne({ where: { fundId: id } }).then((result) => {
      if (result) {
        return res.status(400).json({
          status: "error",
          message: "Fund already exist with this Id " + id
        });
      } else {
        // Add Fund
        const fund = new Fund(requests);
        fund
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
              message: err.message || "Not saved"
            });
          });
      }
    });
  }
};

// Get all funds
exports.findAll = (req, res) => {
  Fund.findAll()
    .then((result) => {
      return res.status(200).json({
        status: "success",
        data: result
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: err.message || "Something wrong while retrieving Funds."
      });
    });
};

// Get funds by organisation
exports.findInvestmentsByOrganization = (req, res) => {
  Fund.findAll({ where: { organizationId: req.params.id } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          status: "error",
          message: " Fund not found"
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
        message: err.message || "Some error occurred while retrieving Funds."
      });
    });
};

// Get funds by status
exports.findOne = (req, res) => {
  Fund.findAll({ where: { status: req.body.status } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          status: "error",
          message: " Fund not found"
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
        message: err.message || "Some error occurred while retrieving Funds."
      });
    });
};
