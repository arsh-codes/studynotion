const mongoose = required("mongoose ");

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    description: { type: String },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});
module.exports = mongoose.model("Category", categorySchema);
