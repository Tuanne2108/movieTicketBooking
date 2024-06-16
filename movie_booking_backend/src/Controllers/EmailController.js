const EmailService = require("../Services/EmailService");
const sendEmail = async (req, res) => {
    try {
        const { email } = req.body;
        if (email) {
            const response = await EmailService.sendEmail(email);
            return res.json(response);
        }
        return res.json({
            status: "err",
            message: "The email is required",
        });
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }
};

module.exports = {
    sendEmail,
};
