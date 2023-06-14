const nodemailer = require("nodemailer")
const sgMail = require("@sendgrid/mail");

function EmailService() {
    return {
        SendMailSG: (otp, emailCust) => {
            return new Promise((resolve, reject) => {
                sgMail.setApiKey("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");

                const msg = {
                    to: emailCust,
                    from: "vothanhtri2k@gmail.com",
                    subject: "Mã OTP register",
                    text: `Mã OTP của quý khách là: ${otp}`
                };
                sgMail.send(msg)
                .then(() => {
                    console.log("Email sent");
                    resolve(true);
                })
                .catch((error) => {
                    console.error(error);
                });
            });
        },
    };
};

module.exports = new EmailService();