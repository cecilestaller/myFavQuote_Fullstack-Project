import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
    {
        authorName: { type: String, required: true },
        authorPicUrl: { type: String },
        role: { type: String, enum: ["Family", "Friends", "Work", "Others"] },
        userId: { type: mongoose.Types.ObjectId, required: true },
    },
    { collection: "authors", timestamps: true }
);

const Author = mongoose.model("Author", authorSchema);
export default Author;
