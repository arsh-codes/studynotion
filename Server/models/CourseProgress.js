const mongoose = require("mongoose");

// Define the CourseProgress schema
const courseProgressSchema = nemongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    completedVideos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubSection",
        },
    ],
});

// Create a model based on the schema
module.exports = mongoose.model("CourseProgress", courseProgressSchema);
