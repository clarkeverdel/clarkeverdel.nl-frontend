const nodemailer = require('nodemailer');

const username = process.env.MAIL_USER;
const password = process.env.MAIL_PASSWORD;

const transporter = nodemailer.createTransport({
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

const send = ({ email, name, text }) => {
  const senderEmail = process.env.MAIL_USER;
  const senderName = "Clarke Verdel";
  const from = name && senderEmail ? `${name} <${senderEmail}>` : `${name || senderEmail}`;
  const to = senderName && senderEmail ? `${senderName} <${senderEmail}>` : `${senderName || senderEmail}`;
  const replyTo = name && email ? `${name} <${email}>` : `${name || email}`;
  const message = {
    from: from,
    to: to,
    subject: `New message from ${name}`,
    html: text,
    replyTo: replyTo,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  });
};

module.exports.send = send;
