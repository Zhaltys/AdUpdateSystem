const appConstants = require('../appConfig');
const fetch = require('node-fetch');
var nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: appConstants.mailHost,
    port: 587,
    secure: false,
    auth: {
        user: appConstants.mailHostName,
        pass: appConstants.mailHostPassword
    }
  });
  function sendMail(toMail, body, htmlBody) {
  let mailOptions = {
    from: "DDOS APP 👻",
    to: toMail,
    subject: 'DDOS App update', // Subject line
    text: body, // plain text body
    html: htmlBody // html body
  };
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
  }); 
  }
function updateCore() {
    fetch(appConstants.coreUpdateRoute);
  }

module.exports = {
    updateCore: updateCore,
    sendMail: sendMail
}