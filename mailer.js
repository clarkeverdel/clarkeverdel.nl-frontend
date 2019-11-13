const nodemailer = require('nodemailer')

const username = "hello@clarkeverdel.nl";
const password = "Hon76564";

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
})

const send = ({ email, name, text }) => {
  const from = name && email ? `${name} <${email}>` : `${name || email}`
  const message = {
    from,
    to: 'hello@clarkeverdel.nl',
    subject: `New message from ${from}`,
    text,
    replyTo: from
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  })
}

module.exports = send
