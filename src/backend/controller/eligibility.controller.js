const db = require("../config/db.config");
const EligibilityCreteria = db.eligibility;

// Post  Eligibility Creteria
  exports.create = (req, res) => {
    let today = new Date();
    let eligibilityid = Math.floor(Math.random() * 10000) + 1;
  
    let criteria = {
      id: eligibilityid,
      projectId: req.body.projectId,
      projectName: req.body.projectName,
      eligibilityCreteria: req.body.eligibilityCreteria,
      
    };
    if (!req.body) {
      return res.status(400).json({
        status: "error",
        message: "Please fill all project input fields"
      });
    }  else {
          // Add project
          const eligibilityCreteria = new EligibilityCreteria(criteria);
          eligibilityCreteria
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
      };


exports.findOne = (req, res) => {
  EligibilityCreteria.findOne({ where: { projectName: req.body.projectName } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          message: "Record Not found"
        });
      } else {
        return res.status(200).json({
          status: "Success",
          data
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message
      });
    });
};
