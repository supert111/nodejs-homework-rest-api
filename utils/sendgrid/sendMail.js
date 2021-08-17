const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_KEY_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_KEY_EMAIL);

const sendMail = async ({ to, subject, text, html }) => {
  const mail = {
    to: 'sportmyk@meta.ua',
    from: 'sportmyk@meta.ua',
    subject,
    text,
    html
  };
  try {
    const answer = await sgMail.send(mail);
    return answer;
  } catch (error) {
    // throw error;
    console.error(error)
  }
}

module.exports = sendMail;
