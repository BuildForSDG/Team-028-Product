const db = require("../config/db.config");
const Project = db.project;

exports.create = (req, res) => {
  let today = new Date();
  let id = Math.floor(Math.random() * 10000) + 1;

  let projects = {
    projectId: id,
    projectCatId: req.body.projectCatId,
    projectName: req.body.projectName,
    description: req.body.description,
    createdBy: req.body.createdBy,
    dateStart: req.body.dateStart,
    dateEnd: req.body.dateEnd,
    fund: req.body.fund,
    organizationId: req.body.organizationId,
    status: "not started",
    dateCreated: today
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
  Project.findOne({ where: { projectId: req.body.projectId || req.params.id } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({
          status: "error",
          message: " Project not found"
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
        message: err.message || "Some error occurred while retrieving Project."
      });
    });
};

// Get sme based projects details
exports.findAllSMEProject = (req, res) => {
  db.sequelize.query(
    `SELECT * FROM projects p 
    LEFT JOIN organizations o ON o.organizationId = p.organizationId 
    WHERE o.category = 1
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
