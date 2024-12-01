const mongoose = require("mongoose");

// Define the schema for the Tag model
const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
});

// Export the Tag model
module.exports = mongoose.model("Tag", TagSchema);
