const passwordResetLinkTemplate = (url) => {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Link</title>
        <style>
            /* Basic email styling */
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
            /* Container setup for centering */
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            /* Logo styling */
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            /* Title styling */
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            /* Main content styling */
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            /* Highlighted link styling */
            .highlight {
                font-weight: bold;
                font-size: 24px;
                color: #FF5733;
            }
    
            /* Support section styling */
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            /* CTA and button styling */
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FFD60A;
                color: #000000;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app">
                <img class="logo" src=https://res.cloudinary.com/dqhsaqbys/image/upload/v1741016843/studyNotion/logos/fullLight.png" alt="StudyNotion Logo">
            </a>
            <div class="message">Password Reset Request</div>
            <div class="body">
                <p>Dear User,</p>
                <p>We received a request to reset your password. To reset your password, please click the link below:</p>
                <a href="${url}" class="cta">Reset Your Password</a>
                <p>This link will expire in 15 minutes. If you did not request a password reset, please disregard this email.</p>
            </div>
            <div class="support">
                If you have any questions or need assistance, please feel free to reach out to us at 
                <a href="mailto:info@studynotion.com">info@studynotion.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};
module.exports = passwordResetLinkTemplate;
