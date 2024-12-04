const nodemailer = require("nodemailer");

// Function to send an email with the specified parameters
const mailSender = async (email, title, body) => {
    try {
        // Create a transporter object using SMTP transport settings
        // Transport in a method to send the email from your application to the recipient's email inbox.

        let transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST, // The server address that handles sending emails (like Gmail or Mailtrap)
            port: process.env.EMAIL_PORT || 587, // The port number used for sending emails
            auth: {
                user: process.env.EMAIL_USERNAME, // The email address used to send the emails
                pass: process.env.EMAIL_PASSWORD, // The app password for the email address
            },
        });

        // Send email with the provided information
        let mailSenderResponse = await transport.sendMail({
            from: process.env.MAIL_USER, // Sender's email
            to: email, // Recipient email address
            subject: title, // Email subject
            html: body, // Email body in HTML format
        });

        console.log(" Email sent successfully.");

        return mailSenderResponse;
    } catch (error) {
        // Improved error handling with a specific message for debugging
        console.error("Error while sending mail:", error.message);
        throw new Error("Failed to send email. Please try again later."); // Return user-friendly message
    }
};
module.exports = mailSender;
