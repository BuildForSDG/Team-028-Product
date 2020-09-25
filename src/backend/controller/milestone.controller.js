const db = require("../config/db.config");
const Milestone = db.milestone;

// Create milestone
exports.create = (req, res) => {
  let id = Math.floor(Math.random() * 100000) + 1;
  let requests = {
    milestoneId: id,
    applicationId: req.body.applicationId,
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description
  };
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Please fill all input fields"
    });
  } else {
    //Check if milestone already exist
    Milestone.findOne({
      where: { name: req.body.name }
    }).then((result) => {
      if (result) {
        return res.status(400).json({  
          status: "error",
          message: "Milestone already exist with this Id "
        });
      } else {
        // Add milestone
        const milestone = new Milestone(requests);
        milestone
          .save()
          .then((data) => {
            return res.status(200).json({
              status: "success",
              data
            });
          })
          .catch((err) => {
            //console.log(err)
            return res.status(500).json({
              status: "error",
              message: err.message || "Not saved"
            });
          });
      }
    });
  }
};

// Get all Milestones
exports.findAll = (req, res) => {
  Milestone.findAll()
    .then((result) => {
      return res.status(200).json({
        status: "success",
        data: result
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: err.message
      });
    });
};

// Get milestone by milestone name
exports.findOne = (req, res) => {
  Milestone.findAll({ where: { applicationId: req.params.name } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          status: "error",
          message: " Milestone not found"
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

// Get milestone by milestone name
exports.updateMilestone = (req, res) => {
  
  const { id, progress, status } = req.body;

  Milestone.findOne({ where: { id: id} })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          status: "error",
          message: " Milestone not found"
        });
      } else {
        // update milestone
        Milestone.update({ progress, status },
          { where: { id } }
          ).then(() => {
          res.status(200).json({
            status: "success",
            message: "milesone has been updated successfully"
          });
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
