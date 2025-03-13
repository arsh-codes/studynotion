import mongoose from "mongoose";

// Define the schema for the Connection model
const connectionSchema = new mongoose.Schema({
    connectionStatus: {
        type: Boolean,
        default: true,
    },
});

// Export the Connection model
const Connection = mongoose.model("Connection", connectionSchema);
export default Connection;
