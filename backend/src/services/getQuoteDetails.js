import { Quote, Author } from "../models/index.js";

export async function getQuoteDetails(authenticatedUserId, quoteId) {
    // find quote
    const foundQuote = await Quote.findOne({
        userId: authenticatedUserId,
        _id: quoteId,
    });
    if (!foundQuote) throw new Error("Quote doesn't exists anymore");

    // find author
    const foundAuthor = await Author.findOne({ authorName: foundQuote.author });
    if (!foundAuthor) throw new Error("Every Quote requires an author");

    return {
        quoteDetails: foundQuote,
        authorDetails: foundAuthor,
    };
}
