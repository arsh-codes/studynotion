// Importing the nodemailer package and specific types for the transporter and sendMail options.
// This allows TypeScript to properly type-check nodemailer functionality.
import nodemailer, { Transporter, SendMailOptions } from "nodemailer"; // changed: 'import' syntax for ES6 modules and importing specific types for better type safety

// Define the type for the parameters passed to the mailSender function.
// This ensures that the mailSender function receives the correct types for its input parameters.
interface MailSenderParams {
    // changed: 'interface' to define the structure of the parameter object for strong typing
    email: string; // changed: type 'string' for the email
    title: string; // changed: type 'string' for the email title
    body: string; // changed: type 'string' for the email body
}

// Function to send an email with the specified parameters
const mailSender = async ({
    email,
    title,
    body,
}: MailSenderParams): Promise<any> => {
    // changed: added explicit return type 'Promise<any>'
    try {
        // Create a transporter object using SMTP transport settings.
        // Transporter type is explicitly used for better type-checking of the created transporter.
        let transport: Transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST!, // The server address that handles sending emails (like Gmail or Mailtrap). '!' asserts the value will not be undefined.
            port: Number(process.env.EMAIL_PORT) || 587, // The port number used for sending emails, defaulting to 587 if undefined.
            auth: {
                user: process.env.EMAIL_USERNAME!, // The email address used to send the emails. '!' asserts the value will not be undefined.
                pass: process.env.EMAIL_PASSWORD!, // The app password for the email address. '!' asserts the value will not be undefined.
            },
        });

        // Send email with the provided information.
        const mailSenderResponse = await transport.sendMail({
            from: process.env.MAIL_USER!, // Sender's email. '!' asserts the value will not be undefined.
            to: email, // Recipient email address.
            subject: title, // Email subject.
            html: body, // Email body in HTML format.
        });

        console.log("Email sent successfully.");

        return mailSenderResponse; // Returns the response from the email sending process.
    } catch (error: unknown) {
        // changed: used 'unknown' for better type safety when handling errors
        // Improved error handling with a specific message for debugging.
        if (error instanceof Error) {
            // changed: type guard to check if error is an instance of Error
            console.error("Error while sending mail:", error.message); // Logs the error message
        }
        throw new Error("Failed to send email. Please try again later."); // User-friendly error message
    }
};

export default mailSender; // Exporting the mailSender function for use in other parts of the application.
