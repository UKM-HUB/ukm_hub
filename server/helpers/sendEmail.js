require('dotenv').config()
var helper = require('sendgrid').mail;

module.exports = function(sendTo, subjectEmail, contentEmail, responseServer, res){

  /* send email to company */
  // configure email ( send to who, subject email, content email, give feed back to server )
  let from_email = new helper.Email(process.env.EMAIL_FROM);
  let to_email = new helper.Email(sendTo);
  let subject = subjectEmail;
  let content = new helper.Content("text/html", contentEmail);
  let mail = new helper.Mail(from_email, subject, to_email, content);

  // send email api (main function to send email)
  let sg = require('sendgrid')(process.env.APIKEY_SENDGRID_UKMHUB);
  let request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  // response server
  sg.API(request, function(error, response) {
    if (error) console.log(error)
      // console.log(response.statusCode);
      // console.log(response.body);
      // console.log(response.headers);
      console.log(responseServer)
      res.json({
        message: 'Email has been sent'
      })
  })
}
