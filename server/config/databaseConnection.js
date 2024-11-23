
exports.databaseConnector = () => {
    try {
        mongoose.connect(process.env.MONGOOSE_DATABASE_URL).then(() => {
            console.log("Database connected successfully."); 
        });
    } catch (error) {
        console.error("Error occured while connecting to database.");
        console.error(error);
        process.exit(1);
    }
};  
