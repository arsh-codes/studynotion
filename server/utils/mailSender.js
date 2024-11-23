const nodemailer = require("nodemailer");

// Function to send an email with the specified parameters
exports.mailSender = async (email, title, body) => {
    try {
        // Create a transporter object using SMTP transport settings
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST, // SMTP host address
            port: process.env.MAIL_PORT || 587, // SMTP port (587 by default for TLS)
            secure: process.env.MAIL_SECURE === "true", // Use SSL if MAIL_SECURE is 'true'
            auth: {
                user: process.env.MAIL_USER, // Sender's email username
                pass: process.env.MAIL_PASSWORD, // Sender's email password
            },
            debug: true, // Enable detailed logging for debugging
        });

        // Send email with the provided information
        let info = await transporter.sendMail({
            from:  "StudyNotion", // Sender's display name
            to: email, // Recipient email address
            subject: title, // Email subject
            html: body, // Email body in HTML format
        });

        console.log("📝 -> mailSender -> info=", info); // Log email info upon success
        return info;
    } catch (error) {
        console.error("Error while sending mail:", error); // Log error if sending fails
    }
};
 