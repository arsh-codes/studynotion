import Connection from "../models/CheckConnection.js";

export const checkConnection = async (req, res) => {
    try {
        const connectionCheck = await Connection.find({});

        return res.status(200).json({
            success: true,
            message: "Connection is active",
        });
    } catch (error) {
        console.error("Error while checking connection:", error.message);
        return res.status(500).json({
            success: false,
            message: "Connection not established.",
        });
    }
};
