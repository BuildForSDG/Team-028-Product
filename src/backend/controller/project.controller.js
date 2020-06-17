const db = require("../config/db.config");
const Project = db.project;
const Eligibility = db.eligibility;
const ProjectCategory = db.projectCategory;
const projectCategory = db.projectCategory;

exports.create = (req, res) => {
  let today = new Date();
  let id = Math.floor(Math.random() * 10000) + 1;

  let projects = {
    projectId: id,
    categoryName: req.body.categoryName,
    projectName: req.body.projectName,
    description: req.body.description,
    createdBy: req.body.createdBy,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    fundStatus: "Not funded",
    dateCreated : today
  
  };
  if (!req.body) {
    return res.status(400).json({
      status: "error",
      message: "Please fill all project input fields"
    });
  } else {
    Project.findOne({ where: { projectId: id } }).then((result) => {
      if (result) {
        return res.status(400).json({
          status: "error",
          message: "Project already exist with this Id " + id
        });
      } else {
        // Add project
        const project = new Project(projects);
        project
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

// Get all projects
exports.findAll = (req, res) => {
  Project.findAll()  
    .then((result) => {
      return res.status(200).json({
        status: "success",
        data: result
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: err.message || "Something wrong while retrieving Projects."
      });
    });
};        



// Get all projects with category name
exports.findAllwithCategory = (req, res) => {
  Project.findAll({include: ["category"]})
    .then((projects) => {
      return res.status(200).json({
        status: "success",
        data: projects
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: err.message || "Something wrong while retrieving Projects."
      });
    });
};



// Get all active projects
exports.active = (req, res) => { 
  Project.findAll({ where:{dateEnd: {isAfter: new Date()}}})
    .then((result) => {
      return res.status(200).json({
        status: "success",
        data: result
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: err.message || "Something wrong while retrieving Projects."
      });
    });
};

// Get single Project using  parameter
exports.findOne = (req, res) => {
  const projectIds =  req.body.projectId || req.params.id;
  Project.findOne({ where: { projectId: projectIds  } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          status: "error",
          message: " Project not found"
        });
      } else {
        let result = data.dataValues;
        result.eligibility = "";
        
        Eligibility.findOne({ where: { projectId } }).then((criteria) => {
          if (criteria) {
            result.eligibility = criteria.dataValues.eligibilityCreteria;
          }

          ProjectCategory.findOne({where: { projectCatId: result.projectCatId } }).then((category) => {
            result.categoryName = "";
            
            if (category) {
              result.categoryName = category.dataValues.categoryName;
            }
            
            return res.status(200).json({
              status: "success",
              data: result
            });
          });
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: err.message || "Some error occurred while retrieving Project."
      });
    });
};

// Get sme based projects details
exports.findAllSMEProject = (req, res) => {
  db.sequelize.query(
    `SELECT 
    fa.applicationId, fa.fundId, 
    p.status, p.dateStart, p.dateEnd, p.projectId , p.projectName, p.description,f.amount as fund, 
    o.companyName, o.address,
    m.name as milestoneName, m.description as milestoneDescription, m.startDate as milestoneStart,
    m.endDate as milestoneEnd,
    pp.filePath
    FROM fundapplications fa 
    LEFT JOIN organizations o ON fa.organizationId = o.organizationId 
    LEFT JOIN projects p ON fa.projectName = p.projectName
    LEFT JOIN projectproposals pp ON pp.applicationId = fa.applicationId
    LEFT JOIN milestones m ON m.applicationId = fa.applicationId
    LEFT JOIN funds f ON f.fundId = fa.fundId
    `, { raw: true })
    .then((result) => {  
      return res.status(200).json({
        status: "success",
        message: "Projectproposals retrieved successfull",
        data: result[0]
      });
    }).catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message || "An error occured while retrieving project proposals",
      });
    });
};


