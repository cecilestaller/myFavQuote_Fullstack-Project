import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
    {
        quoteText: { type: String, required: true },
        author: { type: String, required: true },
        authorId: { type: mongoose.Types.ObjectId },
        saidAt: { type: Date },
        context: { type: String },
        isFavorite: { type: Boolean, default: false },
        userId: { type: mongoose.Types.ObjectId, required: true },
    },
    { collection: "quotes", timestamps: true }
);

const Quote = mongoose.model("Quote", quoteSchema);
export default Quote;
