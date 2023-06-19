const nodemailer = require("nodemailer")
const sgMail = require("@sendgrid/mail");

function EmailService() {
    return {
        SendMailSG: (otp, emailCust) => {
            return new Promise((resolve, reject) => {
                sgMail.setApiKey("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");

                const msg = {
                    to: emailCust,
                    from: "ndhieuvegia983@gmail.com",
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