const UserModel = require("../models/user.model");

const ejs = require("ejs"); // Make sure ejs is installed and required properly
const otpGeneratorfun = require("../utlis/otp");

const Signup = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate request fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered.' });
        }

        // Generate OTP and token
        const { otp, token } = otpGeneratorfun(req.body);

        // Render email template
        const htmlTemplate = await ejs.renderFile(
            __dirname + "/../views/email.ejs",
            { name, otp } // Pass variables to template
        );

        console.log("Generated HTML Template:", htmlTemplate);

        // Send response (you can integrate email sending here)
        res.status(200).json({
            message: "User signup initiated successfully!",
            otp,
            token,
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

module.exports = { Signup };
