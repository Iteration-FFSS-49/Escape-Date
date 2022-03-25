// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

require('dotenv').config();
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require('../../twilio.js')


const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const SmsController = {};

SmsController.sendSOS = (req, res, next) =>{
console.log('from smscontroller.sendsos middleware!!!!', res.locals.contacts)
for (let i = 0; i < res.locals.contacts.length; i++){
  client.messages
  .create({
    body: `SOS!!! Trash date!!! - Sent by ${req.query.name}`,
    from: '+13093265517',
    to: `${res.locals.contacts[i].phone}` 
  })
    .then(message => console.log(message.sid))
    .catch((err) => {
      console.log(err)
    })
}
  next();

}

module.exports = SmsController;