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

// ===== Mongoose-Instance-Methods:
// --> ".toAuthorInfo()" kann so im Service direkt aufgerufen werden
authorSchema.methods.toAuthorInfo = function () {
    return {
        authorName: this.authorName,
        role: this.role,
        authorPicUrl: this.authorPicUrl,
    };
};

const Author = mongoose.model("Author", authorSchema);
export default Author;
