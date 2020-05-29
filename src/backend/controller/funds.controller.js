const db = require("../config/db.config");
const Fund = db.fund;
/**
 * This API will keep track of all funds recieved from
 * investors
 */

// Invest funds
exports.create = (req, res) => {
  let requests = {
    fundId: req.body.fundId,
    organizationId: req.body.organizationId,
    fundCatId: req.body.fundCatId,
    amount: req.body.amount,
    status: req.body.status,
    dateInitiated: req.body.dateInitiated
  };
  if (!req.body) {
    return res.status(400).send({
      messege: "Please fill all funds input fields"
    });
  } else {
    Fund.findOne({ where: { fundId: req.body.fundId } }).then((result) => {
      if (result) {
        return res.status(400).send({
          message: "Fund already exist with this Id " + req.body.fundIdId
        });
      } else {
        // Add Fund
        const fund = new Fund(requests);
        fund
          .save()
          .then((data) => {
            return res.status(200).send(data);
          })
          .catch((err) => {
            return res.status(500).send({
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
      return res.status(200).send(result);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Something wrong while retrieving Funds."
      });
    });
};

// Get funds by organisation
exports.findOne = (req, res) => {
  Fund.findOne({ where: { organizationId: req.body.organizationId } })
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: " Fund not found"
        });
      } else {
        return res.status(200).send(data);
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving Funds."
      });
    });
};

// Get funds by status
exports.findAll = (req, res) => {
  Fund.findAll({ where: { status: req.body.status } })
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: " Fund not found"
        });
      } else {
        return res.status(200).send(data);
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving Funds."
      });
    });
};
