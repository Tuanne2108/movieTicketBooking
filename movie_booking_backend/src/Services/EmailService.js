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
        from: '"RAP PHIM CNEMA" <cnemawad@gmail.com>',
        to: email,
        subject: "Your Booking Information",
        text: `
            Dear Mr. Nghia,
    
            Thank you for booking with RAP PHIM CNEMA. Here are the details of your booking:
    
            - Customer Name: [Nguyen Trung Nghia]
            - Movie: [BỐ GIÀ]
            - Show Time: [Date & Time]
            - Number of Tickets: [1]
            - Seat(s): [A10]
    
            Please arrive at the theater at least 15 minutes before the showtime to collect your tickets and settle into your seats.
    
            We look forward to welcoming you at RAP PHIM CNEMA.
    
            Best regards,
            The RAP PHIM CNEMA Team
        `,
        html: `
            <p>Dear Mr. Nghia,</p>
            <p>Thank you for booking with <b>RAP PHIM CNEMA</b>. Here are the details of your booking:</p>
            <ul>
                <li><b>Customer Name:</b> [Nguyen Trung Nghia]</li>
                <li><b>Movie:</b> [BỐ GIÀ]</li>
                <li><b>Show Time:</b> [20/6/2024]</li>
                <li><b>Number of Tickets:</b> [1]</li>
                <li><b>Seat(s):</b> [A10]</li>
            </ul>
            <p>Please arrive at the theater at least 15 minutes before the showtime to collect your tickets and settle into your seats.</p>
            <p>We look forward to welcoming you at <b>RAP PHIM CNEMA</b>.</p>
            <p>Best regards,<br>
            The RAP PHIM CNEMA Team</p>
        `,
    });
    
    return info;
};

module.exports = {
    sendEmail,
};
