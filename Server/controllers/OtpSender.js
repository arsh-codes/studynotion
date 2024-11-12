const User = require("../models/User");
const Otp = require("../models/Otp ");
const otpGenerator = require("otp-generator");
exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const checkUserPresent = await User.findOne(email);

        if (checkUserPresent) {
            return res
                .status(401)
                .json({ success: false, message: "User already exists." });
        }
        let generatedOtp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let otpSearchResult = await Otp.findOne({ otp: generatedOtp });

        while (otpSearchResult) {
            // Regenerate OTP and update the search result in each loop iteration
            generatedOtp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            otpSearchResult = await Otp.findOne({ otp: generatedOtp });
        }
        
        console.log("📝 -> exports.sendOtp= -> generatedOtp=", generatedOtp);
        const otpEntry = await Otp.create(email, generatedOtp);
        console.log("📝 -> exports.sendOtp= -> otpEntry=", otpEntry);

        // Continue with the rest of your code, now with a unique generatedOtp
    } catch (error) {
        console.error("Error while creation of OTP.");
    }
};
