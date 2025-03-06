import nodemailer from "nodemailer";

// Function to send an email with the specified parameters
const mailSender = async (email, title, body) => {
    try {
        // Create a transporter object using SMTP transport settings
        const transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST, // SMTP server (e.g., Gmail, Mailtrap)
            port: process.env.EMAIL_PORT || 587, // Default SMTP port
            auth: {
                user: process.env.EMAIL_USERNAME, // Sender's email username
                pass: process.env.EMAIL_PASSWORD, // Sender's email password
            },
        });

        // Send email with the provided details
        const mailSenderResponse = await transport.sendMail({
            from: process.env.MAIL_USER, // Sender's email
            to: email, // Recipient's email
            subject: title, // Email subject
            html: body, // Email body (HTML format)
        });

        console.log("✅ Email sent successfully.");
        return mailSenderResponse;
    } catch (error) {
        console.error("❌ Error while sending mail:", error.message);
        throw new Error("Failed to send email. Please try again later.");
    }
};

export default mailSender;
