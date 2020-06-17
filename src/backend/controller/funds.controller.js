const db = require("../config/db.config");

const Project = db.project;
const Fund = db.fund;

/**
 * This API will keep track of all funds recieved from
 * investors
 */ 

// Invest funds
exports.create = async (req, res) => {
  let id = Math.floor(Math.random() * 10000) + 1;
  let fundfield="Funded";

  const projectId =  req.body.projectId;
  
  let requests = {
    fundId: id,
    organizationId: req.body.organizationId,
    projectId: req.body.projectId,
    fundCatId: req.body.fundCatId,
    amount: req.body.amount,
    status: req.body.status,
    fund:fundfield,
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
        db.sequelize.transaction().then((transaction) => {
        
        // Add Fund
        const fund = new Fund(requests);
        fund
          .save()
          .then((data) => {

            // update project status
            let message = "fund created but project status has not been updated";
          
            Project.findOne({ where : { projectId } }).then((project) => {
              if (project){
                project.status = "funding initiated";
                project.fund="funded";
                project.save();
                message = "fund created and project status updated";
              }
            }).catch((error) => {
              transaction.rollback().then(() => {
                return res.status(500).json({
                  status: "error",
                  message: "An error occurred while trying to update project status"
                });
              });
            });

            return res.status(200).json({
              status: "success",
              message,
              data
            });
          })
          .catch((err) => {
            transaction.rollback().then(() => {
              return res.status(500).json({
                status: "error",
                message: err.message || "An error occurred while trying to create funding"
              });
            })
          });
        });
      }
    });
  }
};

// Get all funds
exports.findAll = (req, res) => {
  db.sequelize.query(
    `select p.projectName, f.amount,f.status,f.dateInitiated,o.companyName
    from eazsme_db.funds f
   left join eazsme_db.projects p on p.projectId=f.projectId
   left join eazsme_db.organizations o on o.organizationId=f.organizationId
   order by p.projectName desc;
    `, { raw: true })
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


// get investment details by id
exports.findFundById = (req, res) => {
  Fund.findOne({ where: { fundId: req.params.id } })
    .then((fund) => {
        res.status(200).json({
        status: "success",
        data: fund
        });   
      })
    .catch((err) => {
        return res.status(500).json({
        status: "error",
          message: err.message
        });
      }); 
};

// Get funds by organisation
exports.findInvestmentsByOrganization = (req, res) => {
    db.sequelize.query(
      `SELECT p.projectName, f.dateInitiated, f.amount, p.description, f.fundId, f.status FROM funds f
      LEFT JOIN projects  p ON f.projectId = p.projectId 
      WHERE f.organizationId = ${req.params.id} 
      `, { raw: true })
      .then((result) => {   
        return res.status(200).json({
          status: "success",
          message: "Fund detatils retrieved successfully",
          data: result[0]
        });
      }).catch((error) => {
        return res.status(400).json({
          status: "error",
          message: error.message || "Some error occurred while retrieving Funds.",
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

// update investment status
exports.updateStatus = (req, res) => {
  Fund.findOne({ where: { fundId: req.body.id } })
    .then((fund) => {
      //get user details from req and save changes 
      fund.status = req.body.status;   
      fund.save().then(() => {
        res.status(200).json({
        status: "success",
        message: "fund status have been update"
        }) ;   
      })
    .catch((err) => {
        return res.status(500).json({
        status: "error",
          message: err.message
        });
      }); 
  
});
};