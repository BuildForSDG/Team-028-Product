const db = require("../config/db.config");
const FundApplication = db.fundApplication;

// Post a application
exports.create = (req, res) => {
  //let date = new Date();  
  const appId = Math.floor(Math.random() * 100000) + 1;
  let requests = {  
    applicationId: appId,
    organizationId: req.body.organizationId,
    fundId: req.body.fundId,
    projectName: req.body.projectName,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    description: req.body.description,
    proposals: req.body.proposal
   // proposals: req.file.path
  };
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Fields cannot be empty"
    });
  } else {
    FundApplication.findOne({
      where: { applicationId: appId }
    }).then((data) => {
      if (data) {
        return res.status(400).json({
          status: "error",
          message: "Application already Submit"
        });
      } else {
        // create new user instance
        const fundApplication = new FundApplication(requests);
        fundApplication
          .save()
          .then((data) => {
            return res.status(200).json({
              status: "success",
              message: "New Fund Application Created",
              data
            });
          })
          .catch((err) => {
            return res.status(500).json({
              status: "error",
              message: err.message || "Something went wrong."
            });
          });
      }
    });
  }
};

// Get all fund applications
exports.findAll = (req, res) => {
  FundApplication.findAll()
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

/* Find funds by userId
 *
 * This will filter all funds applied by organization with application status
 **/
exports.findOne = (req, res) => {
 
  FundApplication.findAll({ where: { organizationId: req.body.organizationId } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          message: " Fund Application not found"
        });
      } else {
        return res.status(200).json(data);
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message
      });
    });
};


exports.updateOne = (req, res) => {
  FundApplication.findAll({ where: { id: req.body.id } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          message: " Fund Application not found"
        });
      } else {
        data.update({ status: req.body.status},
          { where: { id:req.body.id } }
          ).then(() => {
          res.status(200).json({
          status: "success",
          message: data
          }) ;   
        }).catch((err) => {

          return res.status(500).json({
          status: "error",
          message: err.message
          });
    
        });
       
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message
      });
    });
};

