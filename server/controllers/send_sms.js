// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

const accountSid = 'AC3fa06a3c37cf6fa2c801972cf7117851';
const authToken = 'd29e2c91b4503fe49c6499a56692b19c';
const client = require('twilio')(accountSid, authToken);

const smsController = {};

smsController.sendSOS = (req, res, next) =>{

  client.messages
  .create({
    body: 'SOS!!! Bad date!',
    from: '+13093265517',
    to: '+18589975734' //req.body???
  })
    .then(message => console.log(message.sid));
  
  next();
}

module.exports = smsController;