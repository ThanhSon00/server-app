const ejs = require('ejs');
const nodemailer = require('nodemailer');
const origin = process.env.ORIGIN;

const renderFileAsync = (filePath, data) => {
    return new Promise((resolve, reject) => {
        ejs.renderFile(filePath, { origin, ...data }, (error, renderedHtml) => {
            if (error) {
                reject(error);
            } else {
                resolve(renderedHtml);
            }
        });
    });
}

const sendMail = async (recipient, htmlData) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: process.env.APP_USER,
          clientId: process.env.MAIL_CLIENT_ID,
          clientSecret: process.env.MAIL_CLIENT_SECRET,
          accessToken: process.env.ACCESS_TOKEN,
          refreshToken: process.env.REFRESH_TOKEN
        },
      });
    const mailOptions = {
        from: process.env.APP_USER,
        template: "request-reset-password",
        to: recipient,
        subject: "Reset Password",
        html: htmlData
    }
    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    renderFileAsync,
    sendMail,
}