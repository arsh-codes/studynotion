const mongoose = require("mongoose");

// Define the CourseProgress schema
const SubSectionSchema = nemongoose.Schema({
    title: {
        type: string,
    },
    timeDuration: {
        type: String,
    },
    description: { type: String },
    videoUrl: { type: String },
});

// Create a model based on the schema
const SubSection = mongoose.model("SubSection", SubSectionSchema);

module.exports = SubSection;
