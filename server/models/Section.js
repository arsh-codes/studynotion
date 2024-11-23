const mongoose = require("mongoose");

// Define the CourseProgress schema
const sectionSchema = nemongoose.Schema({
    sectionName: {
        type: string,
    },
    subSection:[ {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SubSection",
    }],
});

// Create a model based on the schema
module.exports = mongoose.model("Section", sectionSchema);


