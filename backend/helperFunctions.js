const appConstants = require('../appConfig');
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: appConstants.mailHost,
  port: 587,
  secure: false,
  auth: {
    user: appConstants.mailHostName,
    pass: appConstants.mailHostPassword,
  },
});
function sendMail(toMail, body, htmlBody) {
  const mailOptions = {
    from: `CONTENT SCANNING APP 👻 <${appConstants.mailHostName}>`,
    to: toMail,
    subject: 'CONTENT SCANNING APP UPDATE', // Subject line
    text: body, // plain text body
    html: htmlBody, // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
    console.log('New mail to: ', toMail);
    if (error) {
      return console.log(error);
    }
  });
}
function updateCore() {
  fetch(appConstants.coreUpdateRoute);
}

module.exports = {
  updateCore,
  sendMail,
};
