const nodemailer = require("nodemailer");
const { mail } = require("../config/env");

const sgTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sgTransport({
    auth: {
        api_key: "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"
    }
}))

// rijyliru@getnada.com
// qiry@getnada.com
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//          user: mail.user,
//          pass: mail.pass
//      }
//  });

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
