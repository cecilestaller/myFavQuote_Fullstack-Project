import { Quote, Author } from "../models/index.js";

export async function getAllQuotesOfAuthor(authenticatedUserId, authorId) {
    const foundAuthor = await Author.findById(authorId);
    if (!foundAuthor) throw new Error("Author doesn't exist anymore");

    const foundQuotes = await Quote.find({
        authorId: foundAuthor._id,
        userId: authenticatedUserId,
    });
    if (!foundQuotes) throw new Error("No Quotes with authorId exist");

    return { author: foundAuthor, quotes: foundQuotes };
}
