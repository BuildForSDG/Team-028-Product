const nodemailer = require("nodemailer");
const { mail } = require("../config/env");

const sgTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sgTransport({
    auth: {
        api_key: mail.apiKey
    }
}))


const mailer = (options) => {
  const mailOptions = {
    from: mail.user,
    to: options.email,
    replyTo: "eazsme@gmail.com",
    subject: options.subject,
    html:options.html,
  };  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.info(`Email sent:  + ${info.response}`);
    }
  });
};

module.exports = mailer;
