require("dotenv").config(); // read .env file if present.

const nodemailer = require("nodemailer");
const querystring = require('querystring');

exports.handler = function(event, context, callback) {
  const username = process.env.MAIL_USER;
  const password = process.env.MAIL_PASSWORD;
  const requestBody = JSON.parse(event.body);
  const { name, email, reason, description } = requestBody;
  const emailHeading = `<p><strong>Reason of contacting: ${reason}</strong></p>`;
  const emailBody = `<p>${description}</p>`;

  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Office 365 server
    port: 587,     // secure SMTP
    secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
    auth: {
      user: username,
      pass: password
    },
    tls: {
      ciphers: 'SSLv3'
    }
  });

  // make sure we have data and email
  if (!requestBody || !email) {
    return callback(null, {
      statusCode: 400,
      body: 'Mailing details not provided'
    })
  }

  const senderEmail = process.env.MAIL_USER;
  const senderName = "Clarke Verdel";
  const from = name && senderEmail ? `${name} <${senderEmail}>` : `${name || senderEmail}`;
  const to = senderName && senderEmail ? `${senderName} <${senderEmail}>` : `${senderName || senderEmail}`;
  const replyTo = name && email ? `${name} <${email}>` : `${name || email}`;
  const text = emailHeading + emailBody;

  const mailOptions = {
    from: from,
    to: to,
    subject: `New message from ${name}`,
    html: text,
    replyTo: replyTo,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    // handle errors
    if (error) {
      return callback(null, {
        statusCode: 500,
        body: JSON.stringify(error)
      });
    }

    // success!
    callback(null, {
      statusCode: 200,
      body: "mail sent"
    });
  });
};
