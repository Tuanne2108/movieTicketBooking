const express = require("express");
const router = express.Router();
const emailController = require("../Controllers/EmailController");

//Request
router.post("/send-email", emailController.sendEmail);

module.exports = router;
