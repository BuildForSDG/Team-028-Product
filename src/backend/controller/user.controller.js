/* eslint no-console: "error" */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Handlebars = require("handlebars");
const read = require("read-file");
const path = require("path");

const db = require("../config/db.config");
const mailer = require ("../helpers/mailer");

const secret = "secret";
const User = db.user;
const Userpass = db.userLogin;
const Organization = db.userOrganization;
const AcctActivation = db.useractivation;



exports.create = (req, res) => {
  let today = new Date();
    let userRole = "Admin";
  let userPrivilege = "Level 1";
  let orgId = Math.floor(Math.random() * 10000) + 1;
 let loginID = Math.floor(Math.random() * 10000) + 1;
let userID = Math.floor(Math.random() * 100000) + 1;
let organizationId =0;

  //Check empty request
  if (!req.body) {
    return res.status(204).json({
      status: "error",
      message: "User details cannot be empty"
    });
  }

  let error = "";
  let status = false;
  let saved = "";
  User.findOne({ where: { email: req.body.email } })
    .then((data) => {
      if (data) {
        // return result if data already exist
        error = "User already exist";
       
        return;
      } else {

//check if organization exist
Organization.findOne({ where: { email: req.body.companyEmail } })
.then((data) => {
  if (data) {
    // return result if data already exist
    error = "User already exist";
    return;
  } else {
    const organization = new Organization({
      organizationId: orgId,
      companyName: req.body.companyName,
      category: req.body.userType,
      RCNumber: req.body.rccNumber,
      email: req.body.companyEmail,
      BVN: req.body.bvn,
      address: req.body.companyAddress,
      dateIncorporated: req.body.dateIncorporated,
      createdAt: today,
      updatedAt: today
    });

    //Save organization
    organization
      .save()
      .then((data) => {
        saved = "Data saved successfully";
        organizationId=orgId;
      })
      .catch((error) => {
        status = true;
      });
  }
})
.catch((error) => error);

        // Create new instance of  user
        const user = new User({
          userId: userID,
          organizationId: orgId,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          otherName: req.body.otherName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          role: userRole,
          privilege: userPrivilege,
          dateCreated: today
         
        });
        user
          .save()
          .then((data) => {
            saved = "Data saved successfully";
          })
          .catch((error) => {
            status = true;
          });
      }
    })
    .catch((error) => error);

 

  Userpass.findOne({ where: { email: req.body.email } })
    .then((data) => {
      if (data) {
        // return result if data already exist
        error = "User already exist";
        return;
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            // Now we can store the password hash in db.
            if (err) {
              return res.status(401).json({
                status: "error",
                message: "Unauthorized user"
              });
            }
            const pass = new Userpass({
              loginId: loginID,
              userId: userID,
              organizationId: orgId,
              email: req.body.email,
              password: hash,
              category: req.body.userType,
              companyName: req.body.companyName 
            });

            pass
              .save()
              .then((data) => {
                saved = "Data saved successfully";
              })
              .catch((error) => {
                status = true;
              });
          });
        });
      }
    })
    .catch((error) => error);

  if (status) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  } else {

    const data = {
      category: req.body.userType,
      organizationId: orgId,
      userId: userID,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      otherName: req.body.otherName,
      email: req.body.email
    };

    //generate token
    const token = jwt.sign(data, "secret", { expiresIn: "4h" });

    // send email
    const source = read.sync(path.join(__dirname, "/../templates/verifyUrl.hbs"), "utf8");
    const template = Handlebars.compile(source);
    
    const host = req.get("host");
    const protocol =  req.protocol;
    
    const verifyUrl = `${protocol}://${host}/user/verify?token=${token}&email=${req.body.email}`;
    const firstName = data.firstName;

    const options = {};
    
    options.email = req.body.email;
    options.subject = "Confirm your Registration now";
    options.html = template({ verifyUrl, firstName });

    mailer(options);

    return res.status(200).json({
      status: "success",
      data,
      message: saved
    });
  }
};

exports.findAll = (req, res) => {
  User.findAll()
    .then((users) => {
      return res.status(200).json({
        status: "success",
        data: users
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: err.message
      });
    });
};


//Get all users in an Organization
exports.findOnebyOrganization = (req, res) => {
  User.findAll({ where: { organizationId: req.params.orgId || req.body.organizationId }} )
    .then((users) => {
      return res.status(200).json({
        status: "success",
        data: users
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: err.message
      });
    });
};

// find single user by id
exports.findOne = (req, res) => {
  db.sequelize.query(
    `select u.id as userId,  u.firstName,u.lastName,u.otherName,u.email,u.phoneNumber,
    o.companyName, o.RCNumber,o.email as coyEmail,o.dateIncorporated, o.BVN, o.address
    FROM users u
    join organizations o on o.organizationId = u.organizationId
    where u.id = ${req.params.id}`
     , { raw: true })
     .then((result) => {  
      return res.status(200).json({
        status: "success",
        message: "User details retrieved successfull",
        data: result[0]
      });
    }).catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message || "An error occured while retrieving user proposals",
      });
    });
};

// fine single user details by id
exports.updateOne = (req, res) => {
  Userpass.findOne({ where: { email: req.body.email } })
    .then((userpass) => {
      //get user details from req and save changes    
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          // Now we can store the password hash in db.
          if (err) {
            return res.status(401).json({
              status: "error",
              message: "Unauthorized user"
            });
          }
                 Userpass.update({ password: hash},
          { where: { id:userpass.id } }
          ).then(() => {
          res.status(200).json({
          status: "success",
          data: userpass
          }) ;   
        })
          .catch((err) => {

        return res.status(500).json({
            status: "error",
        message: err.message
        });
          });  
            });
     });

});
};

// create organization's sub-user endpoint
exports.userOrganization = (req, res) => {
  let today = new Date();
let loginID = Math.floor(Math.random() * 10000) + 1;
let userID = Math.floor(Math.random() * 100000) + 1;
  let userPrivilege = "Level 2";
  //Check empty request
  if (!req.body) {
    return res.status(204).json({
      status: "error",
      message: "User details cannot be empty"
    });
  }
  User.findOne({ where: { email: req.body.email } })
    .then((data) => {
      if (data) {
        // return result if data already exist
        return res.status(401).json({
          status : "exist",
          message : "User already exist"
        });
      } else {
        // Create new instance of  user
        const user = new User({
          userId: userID,
          organizationId: req.body.organizationId, //organization id comes from request body
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          otherName: req.body.otherName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          role:req.body.role,
          privilege: userPrivilege,
          dateCreated: today
        });
        user
          .save()
          .then((data) => {
            // save login creadentials if user details is successfully saved
            if (data) {
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                  // Now we can store the password hash in db.
                  if (err) {
                    return res.status(401).json({
                      status: "error",
                      message: "Unauthorized user"
                    });
                  }
                  const pass = new Userpass({
                    loginId: loginID,
                    userId: userID,
                    organizationId: req.body.organizationId,
                    email: req.body.email,
                    password: hash,
                    category: req.body.category
                  });
      
                  pass
                    .save()
                    .then((result) => {
                      if (result) {
                        let data = {
                          userId: userID,
                          organizationId: req.body.organizationId,
                          companyName: req.body.companyName,
                          email: req.body.companyEmail,
                          role: req.body.role,
                          privilege: userPrivilege
                        };
                        return res.status(200).json({
                          status : "success",
                          response : data
                        });
                      }
                    })
                    .catch((err) => {
                      return res.status(500).json({
                        status: "error",
                        message: err.message
                      });
                    });
                });
              });
            }  else {
              return res.status(400).json({
                status: "error",
                message: "Not saved"
              });
            }
          })
          .catch((err) => {
            return res.status(500).json({
              status : "error",
              message : err.message
            });
          });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        status : "error",
        message : err.message
      });
    });
};

exports.activate = (req, res) => {
  // get user token
  const { token, email } = req.query;

  // verify token
  let userInToken;
  try {
    userInToken = jwt.verify(token, "secret");
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message || "could not verify your token" });
  }

  // fetch database user
  const userInDatabase = User.findOne({ where: { email: userInToken.email } });
  if (!userInDatabase) {
    return res.status(400).json({ status: "error", message: "user does not exist" });
  }
  
  // activate user
  AcctActivation.findOne({ where: { email: userInToken.email } }).then((data) => {
    if (!data) {
      const activation = new AcctActivation({
        activationId: Math.floor(Math.random() * 100000) + 1,
        userId: userInToken.userId,
        email: userInToken.email,
        activationStatus:  "activated",
        activationDate: new Date()
      });

      activation.save().then(() => {
        return res.status(200).json({ 
          status: "success", 
          message: "congratulations, you have been verified"
        });
      }).catch((err) => {
        return res.status(400).json({
          status: "error",
          message: err.message || "error occurred while trying to activate user"
        });
      });
    }else{
      return res.status(400).json({
        status: "error",
        message: "user already activated"
      });
    }
  });
};

// find single user by id
exports.getdetails = (req, res) => {
  db.sequelize.query(
    `select u.firstName,u.lastName,u.otherName,u.email,u.phoneNumber, u.dateCreated,
    o.companyName, o.RCNumber,o.email as coyEmail,o.dateIncorporated, o.BVN, o.address
    FROM users u
    join organizations o on o.organizationId = u.organizationId
    where u.email like \'${req.query.email}\'`
     , { raw: true })
     .then((result) => {  
      return res.status(200).json({
        status: "success",
        message: "User details retrieved successfull",
        data: result[0]
      });
    }).catch((error) => {
      return res.status(400).json({
        status: "error",
        message: error.message || "An error occured while retrieving user",
      });
    });
};