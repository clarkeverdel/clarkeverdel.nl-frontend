const mailer = require('../mailer');

exports.handler = (req, res) => {
  const { email = '', name = '', reason = '', description = '' } = req.body;
  const emailHeading = `<p><strong>Reason of contacting: ${reason}</strong></p>`;
  const emailBody = `<p>${description}</p>`;
  let status = '';

  if(email){
    mailer({ email, name, text: emailHeading + emailBody }).then((response) => {
      status = 'Successfully sent an email via the contact form.';
      res.send(status);
    }).catch((error) => {
      status = 'Failed sending the contact form';
      res.send(status);
    });
  }else {
    return "I am sorry. I can't send an email without knowing an address."
  }


  return status;
};
