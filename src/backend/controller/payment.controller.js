/**
 * This API controll repayment of funds recieved for a specific
 * project applied
 */
// Invest funds
const db = require("../config/db.config");
const Payment = db.payment;
const Fund = db.fund;

exports.create = (req, res) => {
  let id = Math.floor(Math.random() * 10000) + 1;
  let requests = {
    paymentId: id,
    organizationId: req.body.organizationId,
    fundId: req.body.fundId,
    accountNumber: req.body.accountNumber,
    bankName: req.body.bankName,
    amount: req.body.amount,
    status: req.body.status,
    paidBy: req.body.paidBy,
    paymentDate: req.body.paymentDate,
    tellerNo: req.body.tellerNo
  };
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Please all input fields required"
    });
  } else {
    Payment.findOne({ where: { paymentId: id } }).then((data) => {
      if (data) {
        return res.status(400).json({
          status: "error",
          message: "Record already exist"
        });
      } else {
        db.sequelize.transaction().then((transaction) => {
           // Add Payment
          const payment = new Payment(requests);
          payment
            .save()
            .then((data) => {
              // update fund status
              Fund.findOne({ where: { fundId: req.body.fundId } }).then((fund) => {
                fund.status = req.body.status;
                fund.save().then(() => {
                  return res.status(200).json({
                    status: "success",
                    data
                  });
                });
              });
            })
            .catch((err) => {
              transaction.rollBack();
              return res.status(500).json({
                status: "error",
                message: err.message || "Not saved"
              });
            });
        });
       
       
      }
    });
  }
};

// Get all payments made
exports.findAll = (req, res) => {
  Payment.findAll()
    .then((result) => {
      return res.status(200).json({
        status: "error",
        data: result
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message
      });
    });
};

// Get Payments made  by id
exports.findOne = (req, res) => {
  Payment.findOne({ where: { paymentId: req.body.paymentId } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          status: "error",
          message: " Record not found"
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

// Get Payments made  by organisation
exports.findAll = (req, res) => {
  Payment.findAll({ where: { organizationId: req.body.organizationId } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          status: "error",
          message: " Record not found"
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

// Get Payments by status
exports.findAll = (req, res) => {
  Payment.findAll({ where: { status: req.body.status } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          status: "error",
          message: " Record not found"
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
