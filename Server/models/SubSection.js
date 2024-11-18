
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
module.exports =  mongoose.model("SubSection", SubSectionSchema);


