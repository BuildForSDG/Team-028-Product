const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Handlebars = require("handlebars");
const fs = require("fs");
const db = require("../config/db.config");
const logger = require("../config/logger");
const env = require("../config/env");

const appRoot = require("../app");

const User = db.users;
const Organization = db.organizations;
const Role = db.roles;
const Audit = db.audits;

/**
 * Create users
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @return {json} res.json
 */
module.exports.register = async (req, res) => {
  const userData = {};

  // verify if user email exists already
  const user = await User.findOne({ where: { userEmail: req.body.email } });
  if (user) {
    return res.status(400).json({ status: "error", message: "email already exists" });
  }

  const creatorId = parseInt(req.body.creatorId, 10);
  const creatorRole = parseInt(req.body.creatorRole, 10);
  const creatorOrganization = parseInt(req.body.creatorOrganization, 10);
  const userOrganization = parseInt(req.body.organization, 10);

  // find organization users by creator Id
  const organization = await Organization.findByPk(creatorOrganization, { include: ["users"] });
  let userInOrganization = null;
  try {
    const organizationUsers = organization.get({ plain: true }).users;
    userInOrganization = organizationUsers.filter((element) => element.userID === creatorId);
  } catch (error) {
    logger.warn(error.message);
    logger.info("No users in this company");
  }

  // get role privileges;
  const userRoles = await Role.findByPk(creatorRole, { include: ["privileges"] });
  let userPrivileges;
  try {
    userPrivileges = userRoles.get({ plain: true }).privileges;
  } catch (error) {
    logger.warn("User has no privileges Assigned Yet");
  }

  if (userPrivileges) {
    const privilege = userPrivileges.filter((element) => element.privilegeId === 1);
    if (!privilege) {
      return res.status(400).json({ status: "error", message: "you don't have this privilege" });
    }
  }

  // To create a user, the creator must be a System Admin or and admin of that Organization
  if (!(userInOrganization || creatorRole === 1 || creatorOrganization === userOrganization)) {
    return res
      .status(400)
      .json({ status: "error", message: "you are not allowed to create users for this organization" });
  }

  // hash the password
  const saltRounds = 10;
  const hash = await bcrypt.hash(req.body.password, saltRounds);

  userData.firstName = req.body.firstName;
  userData.lastName = req.body.lastName;
  userData.userPassword = hash;
  userData.userEmail = req.body.email;
  userData.userCategory = parseInt(req.body.category, 10);
  userData.userOrganization = parseInt(req.body.organization, 10);
  userData.userPhone = parseInt(req.body.phone, 10);
  userData.userRole = parseInt(req.body.role, 10);
  userData.isVerified = false;
  userData.createdAt = new Date();
  userData.updatedAt = new Date();

  let usr;

  try {
    usr = await User.create(userData);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Some error occurred while creating user"
    });
  }

  // delete user password from json sent to client
  const data = usr.dataValues;
  delete data.userPassword;

  // add token to data
  const privateKey = env.jwtsecret;
  const token = jwt.sign(data, privateKey, {
    expiresIn: "1h"
  });
  data.token = token;

  // update audit
  const auditData = {};

  auditData.action = "register";
  auditData.actionStatus = "success";
  auditData.performedBy = data.userID;
  auditData.actionTime = data.createdAt;

  try {
    await Audit.create(auditData);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message || "User registered, but there are errors generating audit data"
    });
  }

  // send email
  const templateHtml = `${appRoot}/templates/verifyUrl.hbs`;
  const source = fs.readFileSync(templateHtml, "utf-8");
  const template = Handlebars.compile(source);

  const transporter = nodemailer.createTransport({
    host: env.mail.host,
    port: env.mail.port,
    auth: {
      user: env.mail.user,
      pass: env.mail.pass
    },
    debug: true,
    logger: true
  });

  const host = req.get("host");
  const verifyUrl = `http://${host}/api/v1/user/verify?token=${token}&email=${data.userEmail}`;

  const mailOptions = {
    from: "vindication@ezSME.com",
    to: `${data.userEmail}`,
    subject: "Verify your email",
    html: template({ verifyUrl })
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(error);
    } else {
      logger.info(`Email sent:  + ${info.response}`);
    }
  });

  const organizationData = {};

  organizationData.userID = data.userID;
  organizationData.userCatId = data.userCategory;
  organizationData.companyName = req.body.companyName || "default";
  organizationData.RCNumber = req.body.rcnumber;
  organizationData.email = req.body.companyEmail || data.userEmail;
  organizationData.BVN = req.body.BVN;
  organizationData.address = req.body.address;
  organizationData.dateIncorporated = new Date(req.body.dateIncorporated);

  try {
    await Organization.create(organizationData);
  } catch (error) {
    logger.warn(error.message || "error creating user organization");
  }
  return res.status(200).json({
    status: "success",
    message: "You have registered successfully",
    data
  });
};

module.exports.findAll = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving users."
      });
    });
};

// fine single user by id
module.exports.findOne = (req, res) => {
  User.findOne({ userId: req.body.userId })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User Profile not found"
        });
      }

      // if user found, send user details
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User Profile not found "
        });
      }

      return res.status(500).send({
        message: "Something went wrong retrieving User profile "
      });
    });
};
