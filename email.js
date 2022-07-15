const sendGridMail = require('@sendgrid/mail');
require('dotenv').config({ path: './sendgrid.env' })
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

function getMessage(emailParams) {
  return {
    to: process.env.SENDGRID_TO_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `New message from ${emailParams.name}, Subject: ${emailParams.subject}`,
    text: 
      `${emailParams.text}
      \nThis message was sent by: ${emailParams.email}`,
  };
}

async function sendEmail(emailParams, res) {
  try {
    await sendGridMail.send(getMessage(emailParams));
    res.redirect('/contact/sent');
  } catch (error) {
    const message = `Error sending email`;
    const errorCode = error.code;
    console.error(message);
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
    return {message, errorCode};
  }
}

module.exports = {
  sendEmail
}