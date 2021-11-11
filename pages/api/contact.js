// export default (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.statusCode = 200;
//   res.end(JSON.stringify({ name: 'Nextjs' }));
// }

const mailer = require('../../mailer');

module.exports = (req, res) => {
  const { email = '', name = '', reason = '', description = '' } = req.body;
  const emailHeading = `<p><strong>Reason of contacting: ${reason}</strong></p>`;
  const emailBody = `<p>${description}</p>`;
  let status = '';

  mailer.send({ email, name, text: emailHeading + emailBody }).then((response) => {
    status = 'Successfully sent an email via the contact form.';
    res.send(status);
  }).catch((error) => {
    status = 'Failed sending the contact form';
    res.send(status);
  });

  return status;
};
