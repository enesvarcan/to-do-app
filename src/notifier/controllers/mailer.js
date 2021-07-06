const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD,
    },
})

module.exports = function sendEmail(to, subject, message, debug = false) {
    if (debug) {
        console.log(`
        From: ${process.env.MAIL_EMAIL}
        To: ${to}
        Subject: ${subject}

        ${message}
        
        `)

        return 200;
    } else {
        const mailOptions = {
            from: process.env.MAIL_EMAIL,
            to,
            subject,
            html: message,
        }
        transport.sendMail(mailOptions, (error) => {
            if (error) {
                console.log(error);
                return 500;
            } else {
                return 200;
            }
        })
    }
}
