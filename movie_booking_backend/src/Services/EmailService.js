const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const sendEmail = async (email) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const info = await transporter.sendMail({
        from: '"Tuan dep trai" <cnemawad@gmail.com>',
        to: email,
        subject: "Anh dit em co phe ko?",
        text: "Hello world?",
        html: "<b>Anh nung qua em oi</b>",
    });
    return info;
};

module.exports = {
    sendEmail,
};
