const mongoose = required("mongoose");

const additionalDetailsSchema = new mongoose.Schema({
    gender: {
        type: String,
        required: true,
        trim: true,
    },
    dateOfBirth: {
        type: Date, // SHOULD BE DATE OR STRING??
    },
    about: {
        type: String,
        trim: true, // Automatically trims leading and trailing whitespaces
    },
    contactNumber: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model(AdditionalDetails, additionalDetailsSchema);
