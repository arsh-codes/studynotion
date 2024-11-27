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
            // debug: true, // Avoid logging sensitive information like email/password (commented out for production)
        });

        // Send email with the provided information
        let info = await transporter.sendMail({
            from: process.env.MAIL_USER, // Sender's email (use actual sender's email from environment variable)
            to: email, // Recipient email address
            subject: title, // Email subject
            html: body, // Email body in HTML format
        });

        // Log email info upon success for tracking purposes, but do not expose sensitive data
        console.log("📝 -> mailSender -> Email sent successfully:", info.response);

        return info;
    } catch (error) {
        // Improved error handling with a specific message for debugging
        console.error("Error while sending mail:", error.message);
        throw new Error("Failed to send email. Please try again later."); // Return user-friendly message
    }
};
